from flask_wtf import FlaskForm
from wtforms import DateField
from wtforms.validators import DataRequired, ValidationError
import datetime

def date_valid(form, field):
    print("Validating new due date.")
    due_date = field.data
    ##TODO: make sure date is not ealier than tomorrow.


class TaskStartForm(FlaskForm):
    start_date = DateField('start_date', format='%Y-%m-%d')