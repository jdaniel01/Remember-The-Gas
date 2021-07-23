from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_exists(form, field):
    print("Checking if email exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != current_user.id:
        raise ValidationError("Email address is already in use by another user.")


def username_exists(form, field):
    print("Checking if username exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != current_user.id:
        raise ValidationError("Email address is already in use by another user.")


class EditUser(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), email_exists])
    photo = StringField('photo')
