from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditUser

user_routes = Blueprint('users', __name__)


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
    user = User.query.get(id)
    form = EditUser()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.emailAddress(form.data["email"])
        user.name(form.data["username"])
        user.picture(form.data["photo"])
        db.session.commit()
        return user.to_dict()


    