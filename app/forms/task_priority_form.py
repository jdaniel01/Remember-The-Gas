from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError

def verify_priority(form, field):
    priority = field.data
    if priority < 0 or priority > 3:
        raise ValidationError("Priority did not validate. Please try again.")

class TaskPriorityForm(FlaskForm):
    priority = IntegerField('priority', validators=[DataRequired(message="Please enter a priority for your task."), verify_priority])