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
  share_code = db.Column(db.String(25))


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
  def shareCode(self):
    return self.share_code

  @shareCode.setter
  def shareCode(self, code):
    self.share_code = code


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "photo": self.photo,
      "share_code": self.share_code
    }