from app.models import db, Task
from datetime import datetime, timedelta

date1 = datetime.utcnow()

def seed_tasks():

    demo6 = Task(name="bananas", owner_id=1, list_id=1, notes="", start_date=date1, due_date=date1+timedelta(days=21), status="open", priority=0)
    demo7 = Task(name="avocados", owner_id=1, list_id=1, notes="", start_date=date1, due_date=date1+timedelta(days=1000), status="open", priority=0)
    demo8 = Task(name="bread", owner_id=1, list_id=1, notes="", start_date=date1, due_date=date1+timedelta(days=60), status="open", priority=1)
    demo9 = Task(name="syrup", owner_id=1, list_id=1, notes="REAL maple syrup!", start_date=date1-timedelta(days=43), due_date=date1+timedelta(days=34), status="open", priority=2)
    demo10 = Task(name="ground beef", owner_id=1, list_id=1, notes="", start_date=date1+timedelta(days=12), due_date=date1+timedelta(days=22), status="open", priority=3)

    demo11 = Task(name="I Wanna Dance with Somebody", owner_id=1, list_id=2, notes="", start_date=date1, due_date=date1+timedelta(days=21), status="open", priority=0)
    demo12 = Task(name="Make You Feel My Love", owner_id=1, list_id=2, notes="", start_date=date1, due_date=date1+timedelta(days=1000), status="open", priority=0)
    demo13 = Task(name="Calum Scott - Dancing On My Own", owner_id=1, list_id=2, notes="", start_date=date1, due_date=date1+timedelta(days=60), status="open", priority=1)
    demo14 = Task(name="California Love", owner_id=1, list_id=2, notes="", start_date=date1-timedelta(days=43), due_date=date1+timedelta(days=34), status="open", priority=2)
    demo15 = Task(name="Boys 2 Men songs", owner_id=1, list_id=2, notes="", start_date=date1+timedelta(days=12), due_date=date1+timedelta(days=22), status="open", priority=3)

    demo16 = Task(name="180", owner_id=1, list_id=3, notes="", start_date=date1, due_date=date1+timedelta(days=21), status="open", priority=0)
    demo17 = Task(name="ground whip", owner_id=1, list_id=3, notes="", start_date=date1, due_date=date1+timedelta(days=1000), status="open", priority=0)
    demo18 = Task(name="barspin", owner_id=1, list_id=3, notes="", start_date=date1, due_date=date1+timedelta(days=60), status="open", priority=1)
    demo19 = Task(name="manual", owner_id=1, list_id=3, notes="personal record 45 ft.", start_date=date1-timedelta(days=43), due_date=date1+timedelta(days=34), status="open", priority=2)
    demo20 = Task(name="wheelie", owner_id=1, list_id=3, notes="personal record 30 ft.", start_date=date1+timedelta(days=12), due_date=date1+timedelta(days=22), status="open", priority=3)

    demo21 = Task(name="design ramp", owner_id=1, list_id=4, notes="", start_date=date1, due_date=date1+timedelta(days=21), status="open", priority=0)
    demo22 = Task(name="choose materials", owner_id=1, list_id=4, notes="", start_date=date1, due_date=date1+timedelta(days=1000), status="open", priority=0)
    demo23 = Task(name="mark and cut", owner_id=1, list_id=4, notes="", start_date=date1, due_date=date1+timedelta(days=60), status="open", priority=1)
    demo24 = Task(name="put together", owner_id=1, list_id=4, notes="", start_date=date1-timedelta(days=43), due_date=date1+timedelta(days=34), status="open", priority=2)
    demo25 = Task(name="send it", owner_id=1, list_id=4, notes="", start_date=date1+timedelta(days=12), due_date=date1+timedelta(days=22), status="open", priority=3)

    demo26 = Task(name="pick-up drycleaning", owner_id=1, list_id=5, notes="", start_date=date1, due_date=date1+timedelta(days=21), status="open", priority=0)
    demo27 = Task(name="get gas", owner_id=1, list_id=5, notes="", start_date=date1, due_date=date1+timedelta(days=1000), status="open", priority=0)
    demo28 = Task(name="drop off photos", owner_id=1, list_id=5, notes="", start_date=date1, due_date=date1+timedelta(days=60), status="open", priority=1)
    demo29 = Task(name="take Charlie to practice", owner_id=1, list_id=5, notes="", start_date=date1-timedelta(days=43), due_date=date1+timedelta(days=34), status="open", priority=2)
    demo30 = Task(name="pick up poncho from groomers", owner_id=1, list_id=5, notes="", start_date=date1+timedelta(days=12), due_date=date1+timedelta(days=22), status="open", priority=3)



    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
    db.session.add(demo23)
    db.session.add(demo24)
    db.session.add(demo25)
    db.session.add(demo26)
    db.session.add(demo27)
    db.session.add(demo28)
    db.session.add(demo29)
    db.session.add(demo30)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()