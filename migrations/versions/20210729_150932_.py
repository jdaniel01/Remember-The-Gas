"""empty message

Revision ID: 66ae773bf095
Revises: 4160b711eef8
Create Date: 2021-07-29 15:09:32.981371

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '66ae773bf095'
down_revision = '4160b711eef8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tasks',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('list_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('notes', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('start_date', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('due_date', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('status', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('priority', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('owner_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], name='tasks_list_id_fkey'),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name='tasks_owner_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='tasks_pkey')
    )
    # ### end Alembic commands ###
