from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField, Datetime
from datetime import datetime
from wtforms.validators import DataRequired, ValidationError

class ListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name for your list.")])
    owner_id = IntegerField('owner_id', validators=[DataRequired(message="Owner id not provided.")])
    notes = TextField('notes')
    due_date = Datetime('due_date')