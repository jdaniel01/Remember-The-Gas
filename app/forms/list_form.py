from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField, DateField
from wtforms.validators import DataRequired, ValidationError, Length

class ListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name for your list."), Length(min=4, max=50, message="List name must have between 4 and 50 characters.")])
    owner_id = IntegerField('owner_id', validators=[DataRequired(message="Owner id not provided.")])
    notes = TextField('notes')
    due_date = DateField('due_date', format='%Y-%m-%d')