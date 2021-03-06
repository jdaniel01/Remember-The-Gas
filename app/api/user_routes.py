from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User, db, List, Task
from app.forms import EditUser, EditPassword, ListForm
from werkzeug.wrappers import Response
from datetime import datetime
from sqlalchemy import desc

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def editUser(id):
    print("$$$$$$$$$$$$$$$$$ IN User PUT", id, request.get_json())
    errors = []
    form = EditUser()
    user = User.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("##################### Validated")
        user.email = form.data["email"]
        user.username = form.data["username"]
        user.photo = form.data["photo"]
        db.session.commit()
        return user.to_dict()
    print("Form Not Validated")
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def editUserInfo(id):
    print("$$$$$$$$$$$$$$$$$ IN User PATCH", id, request.get_json())
    form = EditPassword()
    user = User.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("##################### Validated")
        user.password = form.data["password"]
        db.session.commit()
        return user.to_dict()
    print("Form Not Validated")
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteUser(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return Response("User account deleted.", status=304)


@user_routes.route('/<int:id>/lists', methods=['POST'])
@login_required
def addList(id):
    print("@@@@@@@@ USER/ID/LISTS route @@@@@@@")
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newList = List(
            name=form.data['name'],
            owner_id=form.data['owner_id'],
            notes=form.data['notes'] or None
        )
        db.session.add(newList)
        db.session.commit()
        lists = List.query.filter(List.owner_id == id).order_by(desc(List.id)).all()
        order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########List Added#######", newLists)
        return {"lists": newLists, "list": newLists[order[0]], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
    print("######LIST FORM NOT VALIDATED#######")
    return {"errors": validation_errors_to_error_messages(form.errors)}

@user_routes.route('/<int:id>/lists')
@login_required
def getLists(id):
    print("##########GET LISTS#########", id)
    lists = List.query.filter(List.owner_id == id).order_by(desc(List.id)).all()
    order = [l.id for l in lists]
    newLists = dict([(j.id, j.to_dict()) for j in lists])
    tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
    taskCreatedOrder = [t.id for t in tasks]
    newTasks = dict([(task.id, task.to_dict()) for task in tasks])
    print("#########Lists Retrieved#######", newLists)
    return {"lists": newLists, "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}


@user_routes.route('/<int:id>/tasks')
@login_required
def getTasks(id):
    print("##########GET TASKS#########", id)
    tasks = Task.query.filter(Task.owner_id == id).order_by(desc(Task.id)).all()
    taskCreatedOrder = [t.id for t in tasks]
    newTasks = dict([(t.id, t.to_dict()) for t in tasks])
    print("#######got tasks######", {"tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}})
    return {"tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}