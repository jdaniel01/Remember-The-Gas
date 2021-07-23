from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_exists(form, field):
    print("Checking if email exits", field.data, "form", form)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id is not id:
        raise ValidationError("Email address is already in use by another user.")


def username_exists(form, field):
    print("Checking if username exits", field.data, "form", form)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id is not id:
        raise ValidationError("Email address is already in use by another user.")


class EditUser(FlaskForm):

    id = IntegerField('id', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), email_exists])
    password = StringField('password', validators=[DataRequired()])
