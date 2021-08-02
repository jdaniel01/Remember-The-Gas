from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def verify_status(form, field):
    status = field.data
    if status != "open" and status != "closed":
        raise ValidationError("Status did not validate. Please try again.")

class TaskStatusForm(FlaskForm):
    status = StringField('status', validators=[DataRequired(message="Please enter a status for your task."), verify_status])