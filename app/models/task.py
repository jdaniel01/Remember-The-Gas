from .db import db
from datetime import datetime

class Task(db.Model):
  __tablename__ = 'tasks'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50), nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
  notes = db.Column(db.Text)
  start_date = db.Column(db.DateTime, default=datetime.utcnow)
  due_date = db.Column(db.DateTime)
  status = db.Column(db.String, default="open")
  priority = db.Column(db.Integer, default=0)

  fromList = db.relationship("List", back_populates="tasks")
  owner = db.relationship("User", back_populates="tasks")

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

  
  @property
  def startDate(self):
    return self.start_date

  @startDate.setter
  def startDate(self, newDate):
    self.start_date = newDate

  
  @property
  def currStatus(self):
    return self.status

  @currStatus.setter
  def currStatus(self, newStatus):
    self.status = newStatus

  
  @property
  def currPrior(self):
    return self.priority

  @currPrior.setter
  def currPrior(self, prior):
    self.priority = prior

  @property
  def currList(self):
      return self.list_id

  @currList.setter
  def currList(self, id):
      self.list_id = id

  @property
  def currOwner(self):
      return self.list_id

  @currOwner.setter
  def currOwner(self, id):
      self.list_id = id

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "owner_id": self.fromList.to_detail()["owner_id"],
      "notes": self.notes,
      "start_date": self.start_date,
      "due_date": self.due_date,
      "status": self.status,
      "priority": self.priority,
      "owner_id": self.owner_id
    }
