from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, List, Task
from app.forms import NewTaskForm, TaskNameForm, TaskDueForm, TaskStartForm
from werkzeug.wrappers import Response
from datetime import datetime
from sqlalchemy import desc

task_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages


@task_routes.route("/<int:id>/name", methods=["PUT"])
@login_required
def changeName(id):
    task = Task.query.get(id)
    print("###########CHANGING TASK NAME######## / ", id)
    form = TaskNameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("#########TASK NAME VALIDATED######")
        task.name = form.data["name"]
        db.session.commit()
        print("##########newName######", task.name)
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])

        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########Task Validated#######", newLists)
        return {"lists": newLists, "list": newLists[task.list_id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
        
    print("#########List Name Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}


@task_routes.route("/<int:id>/due", methods=["PUT"])
@login_required
def changeDue(id):
    task = Task.query.get(id)
    print("###########CHANGING TASK Due Date######## / ", id)
    form = TaskDueForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("#########TASK Due Date VALIDATED######")
        task.due_date = form.data["due_date"]
        db.session.commit()
        print("##########new start date######", task.due_date)
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########Task Validated#######", newLists)
        return {"lists": newLists, "list": newLists[task.list_id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
    print("#########List due date Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}



@task_routes.route("/<int:id>/start", methods=["PUT"])
@login_required
def changeStart(id):
    task = Task.query.get(id)
    print("###########CHANGING TASK start Date######## / ", id)
    form = TaskStartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("#########TASK Start Date VALIDATED######")
        task.start_date = form.data["start_date"]
        db.session.commit()
        print("##########new start date######", task.start_date)
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########Task Validated#######", newLists)
        return {"lists": newLists, "list": newLists[task.list_id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
    print("#########List Start Date Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}


@task_routes.route("/<int:id>/status", methods=["PUT"])
@login_required
def changeStatus(id):
    task = Task.query.get(id)
    print("###########CHANGING TASK status ######## / ", id)
    form = TaskStatusForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("#########TASK status VALIDATED######")
        task.status = form.data["status"]
        db.session.commit()
        print("##########new status######", task.status)
        lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
        order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
        tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
        taskCreatedOrder = [t.id for t in tasks]
        newTasks = dict([(task.id, task.to_dict()) for task in tasks])
        print("#########Task Status Validated#######", newLists)
        return {"lists": newLists, "list": newLists[task.list_id], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}
    print("#########List Start Date Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}


@task_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def dropTask(id):
    print("########Deleting Task#######", id)
    task = Task.query.get(id)
    if task:
        print("#########Task to delete######:", task.to_dict())
    
    listId = task.list_id
    db.session.delete(task)
    db.session.commit()
    print("########Task DELETED########")
    lists = List.query.filter(List.owner_id == current_user.id).order_by(desc(List.id)).all()
    order = [l.id for l in lists]
    newLists = dict([(j.id, j.to_dict()) for j in lists])
    tasks = Task.query.filter(Task.owner_id == current_user.id).order_by(desc(Task.id)).all()
    taskCreatedOrder = [t.id for t in tasks]
    newTasks = dict([(task.id, task.to_dict()) for task in tasks])
    print("#########Task Delete#######", newLists)
    return {"lists": newLists, "list": newLists[listId], "order": order, "tasks": newTasks, "tasksOrder": {"created": taskCreatedOrder}}