from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    data = field.data
    user = User.query.filter((User.email == data) or (User.username == data)).first()
    if not user:
        raise ValidationError("User could not be found.")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    print("$$$$$$$$$$$$$$$$$$$$$$$$", password)
    nameOrEmail = form.data['nameOrEmail']
    print("$$$$$$$$$$$$$$$$$$$$$$$$$", nameOrEmail)
    user = User.query.filter((User.email == nameOrEmail) or (User.username == nameOrEmail)).first()
    print("*****************************", user.to_dict())
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    nameOrEmail = StringField('nameOrEmail', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
