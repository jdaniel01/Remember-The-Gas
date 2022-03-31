from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  photo = db.Column(db.Text)
  status = db.Column(db.String(15), default="pending")
  confirmCode = db.Column(db.String(255), nullable=True)

  lists = db.relationship("List", cascade="all,delete", back_populates="owner")
  tasks = db.relationship("Task", cascade="all,delete", back_populates="owner")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.hashed_password, password)

  @property
  def name(self):
    return self.username

  @name.setter
  def name(self, newName):
    self.username = newName

  @property
  def emailAddress(self):
    return self.email

  @emailAddress.setter
  def emailAddress(self, address):
    self.email = address

  @property
  def picture(self):
    return self.photo

  @picture.setter
  def picture(self, pic):
    self.photo = pic

  @property
  def status1(self):
    return self.status

  @status1.setter
  def status1(self, status):
    self.status = status

  @property
  def confirmCode1(self):
    return self.confirmCode

  @confirmCode1.setter
  def confirmCode1(self, code):
    self.confirmCode = generate_password_hash(code)

  def check_confirmCode(self, code):
    return check_password_hash(self.confirmCode, code)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "photo": self.photo,
      "lists": [l.to_dict() for l in reversed(self.lists)],
      "tasks": dict([(task.id, task.to_dict()) for task in self.tasks])
    }
  
  def to_detail(self):
    return {
      "id": self.id,
      "username": self.username,
      "photo": self.photo,
    }
