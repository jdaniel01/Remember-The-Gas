from flask import Blueprint, jsonify, request
import json
from flask_login import login_required, current_user
from app.models import db, List, Task
from werkzeug.wrappers import Response
from sqlalchemy import desc, select


search_routes = Blueprint('search', __name__)

def error_messages(errors):
    """
    function that returns an error list (if errors are present)
    """
    errorMessages = []
    for error in errors:
        errorMessages.append(f"{error}")
    return errorMessages

@search_routes.route("/", methods=["GET", "PUT"])
@login_required
def getResults():
    print("Requesting search results", current_user.id)
    print("This is the request for getResults", request.data.decode('utf-8'))
    data = json.loads(request.data.decode('utf-8'))

    # print("Data: ", type(data))
    have = data['have']
    notHave = data['notHave']
    searchNotes = data['searchNotes']
    print(have, notHave, searchNotes)

    # lists = List.query(filter(((List.owner_id == current_user.id) and )))

    lists = List.query.filter(List.owner_id == current_user.id and List.name.ilike(have) and not List.name.ilike(notHave)).order_by(desc(List.id)).all()
    # taskResults = Task.query.filter((Task.owner_id == current_user.id) and (Task.name.ilike(have) and not Task.name.ilike(notHave)) and (Task.notes.ilike(have) and not Task.notes.ilike(notHave))).order_by(desc(Task.id)).all() if searchNotes else Task.query.filter((Task.owner_id == current_user.id) and (Task.name.ilike(have) and not Task.name.ilike(notHave))).order_by(desc(Task.id)).all()
    # lists = select(List).where(List.name.ilike(have) and not List.name.ilike(notHave) and List.notes.ilike(have) and not List.notes.ilike(notHave))
    listResults = [l.to_dict() for l in lists]
    # listResults = session.execute(lists)

    print(lists, listResults)
    return {'lists': listResults}
    return {'lists': ["No Data"]}
    