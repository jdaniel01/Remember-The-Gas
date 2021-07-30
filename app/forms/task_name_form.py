from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length

class TaskNameForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name for your task."), Length(min=4, max=50, message="Task names must have between 1 and 50 characters.")])
    