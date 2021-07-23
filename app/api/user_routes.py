from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import EditUser

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
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
    testUsername = User.query.filter(User.username == form.data['username']).first()
    testEmail = User.query.filter(User.email == form.data['email']).first()
    if testUsername and testUsername.id != user.id:
        print("testusername != user")
        errors.append("Username is already in use.")
    if testEmail and testEmail.id != user.id:
        errors.append("Email is already in use.")
        print("testusername != user")
    if len(errors) > 0:
        print("Errors length greater than 0")
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("##################### Validated")
        user.email = form.data["email"]
        user.username = form.data["username"]
        user.photo = form.data["photo"]
        # user.emailAddress(email)
        # user.name(username)
        # user.picture(photo)
        db.session.commit()
        return user.to_dict()
    print("Form Not Validated")
    return {"errors": validation_errors_to_error_messages(errors)}


    