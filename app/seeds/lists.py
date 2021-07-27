from app.models import db, List
from datetime import datetime, timedelta

date1 = datetime.utcnow()

def seed_lists():

    demo = List(name="Grocery list", owner_id=1, notes="If the store doesn't have tofu, get chicken instead.", start_date=date1, due_date=date1+timedelta(days=21), status="open", priority=0)
    demo2 = List(name="Wedding Playlist", owner_id=1, notes="Make sure to include some Sam Smith, Fouzia, Dan & Shay, and then liven it up with some Paramore, LinkinPark, Young The Giant, and The Weeknd", start_date=date1, due_date=date1+timedelta(days=1000), status="open", priority=0)
    demo3 = List(name="BMX Tricklist", owner_id=1, notes="Remember, to stretch before and after and start doing Yoga again!", start_date=date1, due_date=date1+timedelta(days=60), status="open", priority=1)
    demo4 = List(name="Ramp Project Plan", owner_id=1, notes="Ok to get the cheapstuff for this one.", start_date=date1-timedelta(days=43), due_date=date1+timedelta(days=34), status="open", priority=2)
    demo5 = List(name="Errands", owner_id=1, notes="The bank closes early on weekends!", start_date=date1+timedelta(days=12), due_date=date1+timedelta(days=22), status="open", priority=3)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()