from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, List, Task
from app.forms import ListForm, ListNameForm, NewTaskForm, ListStartForm
from werkzeug.wrappers import Response
from datetime import datetime
from sqlalchemy import desc

list_routes = Blueprint('lists', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages


@list_routes.route("/")
@login_required
def getLists():
    print("###########REQUESTING LISTS######## / ", current_user.id)
    lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
    newLists = dict([(j.id, j.to_dict()) for j in lists])
    # order = [l.id for l in lists]
    # return {"lists": newLists, "order": order}
    tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
    # taskCreatedOrder = [t.id for t in tasks]
    newTasks = dict([(task.id, task.to_dict()) for task in tasks])
    print("#########Lists retrieved#######")
    # return {"lists": newLists, "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
    return {'lists': newLists, 'tasks': newTasks}

@list_routes.route("/<int:id>")
@login_required
def getList(id):
    print("########Requesting List#######", id)
    alist = List.query.get(id)
    return alist.to_dict()


@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def dropList(id):
    print("########Deleting List#######", id)
    alist = List.query.get(id)
    db.session.delete(alist)
    db.session.commit()

    lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
    # order = [l.id for l in lists]
    newLists = dict([(j.id, j.to_dict()) for j in lists])
    tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
    # taskCreatedOrder = [t.id for t in tasks]
    newTasks = dict([(task.id, task.to_dict()) for task in tasks])
    print("#########List Deleted, lists retrieved#######")
    # return {"lists": newLists, "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
    return {'lists': newLists, 'tasks': newTasks}


@list_routes.route("/<int:id>/name", methods=["PUT"])
@login_required
def editName(id):
    print("########Editing List Name#######", id)
    alist = List.query.get(id)
    form = ListNameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        alist.name = form.data["name"]
        db.session.commit()
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        # order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
       
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        # taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########List Name Validated#######")
        # return {"lists": newLists, "list": newLists[id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
        return {'lists': newLists, 'tasks': newTasks}

    print("#########List Name Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}


@list_routes.route("/<int:id>/start", methods=["PUT"])
@login_required
def editStart(id):
    print("########Editing List start#######", id)
    alist = List.query.get(id)
    form = ListStartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        alist.start = form.data["start"]
        db.session.commit()
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        # order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
       
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        # taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########List start Validated#######", newLists)
        # return {"lists": newLists, "list": newLists[id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
        return {'lists': newLists, 'tasks': newTasks}

    print("#########List start Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}


@list_routes.route("/<int:id>/tasks", methods=["POST"])
@login_required
def addList(id):
    print("########Adding Task to List#######", id)
    form = NewTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            name=form.data["name"],
            list_id=id,
            owner_id=current_user.id
        )
        db.session.add(task)
        db.session.commit()
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        # order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        # taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########Task Validated#######", newLists)
        # return {"lists": newLists, "list": newLists[id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
        return {'lists': newLists, 'tasks': newTasks}

    print("#########List Name Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}