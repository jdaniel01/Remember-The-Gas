from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, List
from app.forms import ListForm, ListNameForm
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
    order = [l.id for l in lists]
    return {"lists": newLists, "order": order}


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
    # ids = [l.id for l in lists]
    # print("$$$$$$$$$$$$$IDS$$$$$$$")
    order = [l.id for l in lists]
    newLists = dict([(j.id, j.to_dict()) for j in lists])
    # newLists = {i: j.to_dict() for i, j in dict(zip(ids, lists))}
    # newLists = {i: j.to_dict() for i, j in dict(zip(range(len(lists)), lists)).items()}
    return {"lists": newLists, "order": order}

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
        order = [l.id for l in lists]
        newLists = dict([(j.id, j.to_dict()) for j in lists])
        # newLists = {i: j.to_dict() for i, j in dict(zip(range(len(lists)), lists)).items()}
        print("#########List Name Validated#######", newLists)
        return {"lists": newLists, "list": newLists[id], "order": order}
    print("#########List Name Failed to Validated#####")
    return {"errors": validation_errors_to_error_messages(form.errors)}