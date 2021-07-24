from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, length
from app.models import User


def email_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email is already registered.")
    

def username_exists(form, field):
    print("Checking if username exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already registered.")



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Please provide a username."), username_exists, length(min=4, max=25, message="Username must be at least 4 characters long.")])
    email = StringField('email', validators=[email_exists, DataRequired(message="Please provide an email address.")])
    password = StringField('password', validators=[DataRequired(message="Please provide a password."), length(min=8, message="Password length must be at least 8 characters.")])
