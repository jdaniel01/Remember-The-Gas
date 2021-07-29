from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length

class ListNameForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name for your list."), Length(min=4, max=50, message="List name must have between 4 and 50 characters.")])
    