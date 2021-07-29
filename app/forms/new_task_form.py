from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class NewTaskForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name for your task."), Length(min=1, max=50, message="Task name must have between 1 and 50 characters.")])
