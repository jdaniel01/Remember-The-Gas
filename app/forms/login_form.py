from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    data = field.data
    # user = User.query.filter((User.email == data) or (User.username == data)).first()
    user = User.query.filter((User.email == data)).first() or User.query.filter((User.username == data)).first()
    if not user:
        raise ValidationError("User could not be found.")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    nameOrEmail = form.data['nameOrEmail']
    # user = User.query.filter((User.email == nameOrEmail) or (User.username == nameOrEmail)).first()
    user = User.query.filter(User.email == nameOrEmail).first() or User.query.filter(User.username == nameOrEmail).first()
    # print("*****************************", user.to_dict())
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    nameOrEmail = StringField('nameOrEmail', validators=[user_exists, DataRequired(message="Please enter a username or email.")])
    password = StringField('password', validators=[password_matches, DataRequired(message="Please enter a password.")])
