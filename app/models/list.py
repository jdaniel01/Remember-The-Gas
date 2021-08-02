from .db import db
from datetime import date

class List(db.Model):
  __tablename__ = 'lists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50), nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  notes = db.Column(db.Text)
  start_date = db.Column(db.Date, default=date.today())
  due_date = db.Column(db.Date)
  status = db.Column(db.String, default="open", nullable=False)
  priority = db.Column(db.Integer, default=0, nullable=False)

  owner = db.relationship("User", back_populates="lists")
  tasks = db.relationship("Task", cascade="all,delete", back_populates="fromList")

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
  def currPriro(self, prior):
    self.priority = prior


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "owner_id": self.owner_id,
      "notes": self.notes,
      "start_date": self.start_date,
      "due_date": self.due_date,
      "status": self.status,
      "priority": self.priority,
      "tasks": dict([(task.id, task.to_dict()) for task in self.tasks]),
      "orderBy": [task.id for task in reversed(self.tasks)]
    }

  def to_detail(self):
    return {
      "owner_id": self.owner_id,
      "id": self.id,
      "name": self.name
    }
