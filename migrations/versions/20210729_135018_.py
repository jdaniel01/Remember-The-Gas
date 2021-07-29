"""empty message

Revision ID: 50586c67929a
Revises: 7d3e73812f2c
Create Date: 2021-07-29 13:50:18.337082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50586c67929a'
down_revision = '7d3e73812f2c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=False),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('due_date', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('priority', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###
