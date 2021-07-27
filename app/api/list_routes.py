from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, List
from app.forms import ListForm
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
    print("###########LISTS##########", lists)
    newLists = {i: j.to_dict() for i, j in dict(zip(range(len(lists)), lists)).items()}
    return newLists


@list_routes.route("/<int:id>")
@login_required
def getList(id):
    print("########Requesting List#######", id)
    alist = List.query.get(id).first()
    return alist.to_dict()