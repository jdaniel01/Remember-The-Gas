from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User

def password_matches(form, field):
    print("Checking if current password matches")
    password = field.data
    user = User.query.get(current_user.id)
    if not user.check_password(password):
        raise ValidationError("Current password was incorrect. Please try again.")


class EditPassword(FlaskForm):
    currentPassword = StringField('currentPassword', validators=[DataRequired(message="Please provide your current password."), password_matches])
    password = StringField('password', validators=[DataRequired(message="Please provide a new password."), Length(min=8, max=25, message="Your new password must have between 8 and 25 characters.")])
    repeatPassword = StringField('repeatPassword', validators=[DataRequired(message="Please confirm your password."), Length(min=8, max=25, message="Your confirmed password must have between 8 and 25 characters.")])