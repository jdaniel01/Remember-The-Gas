from .db import db
from datetime import datetime


class List(db.Model):
  __tablename__ = 'lists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(25), nullable=False)
  owner_id = db.Column(db.Integer, nullable=False)
  notes = db.Column(db.Text)
  due_date = db.Column(db.Datetime, default=datetime.utcnow)



  @property
  def title(self):
    return self.name

  @title.setter
  def title(self, newName):
    self.name = newName

  @property
  def details(self):
    return self.notes

  @details.setter
  def details(self, newNotes):
    self.notes = newNotes

  @property
  def dueDate(self):
    return self.due_date

  @dueDate.setter
  def dueDate(self, newDue):
    self.due_date = newDue

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "owner_id": self.owner_id,
      "notes": self.notes,
      "due_date": self.due_date
    }
