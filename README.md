"Remember the Gas" app

A simple list app which allows you to add lists and tasks or items to lists. This app is a clone of 'Remember the Milk'. This app was built using Python, PostgreSQL, React JS with Redux, CSS and queries were handled through FlaskSQLAlchemy. Docker was used to manage the virtual containers.

- Description

This list app allows logged in users to easily create a list and upon doing so, will navigate you to the list you've created. Then, you'll be able to add items to the list, and edit any items you've created. You may alter the start and due dates for the task or item as well as the priority level and indication if it's open or closed. All changes are rendered dynamically without refreshing the page. If you don't want a task anymore, you can just delete it, or if you're done with the list, you can delete that too and all tasks associated with it will also be deleted. You may also edit your user information in case you want to update your username, email address or password. You also have the option of deleting your account.

- Future Developments

Moving forward I will be implementing a search feature, contacts and the ability to share your tasks or lists with your contacts.

- Requirements

This app requires you to have pipenv installed and set up on your computer. You will also need to have npm installed as well for your front end application. You will also need PostgreSQL installed for your database configuration.

- Backend Overview

Using Python in conjunction with PostgreSQL was as way to deepen my understanding of the two. I didn't feel comfortable with FlaskSQLAlchemy prior to this project and now have a very firm base for moving forward in my Python development career. The ease of queries through dynamic relationships has made communication between the front and backend very smooth. Model generations became almost second nature as I progressed through the project and I look forward to bringing what I've learned into new projects and deepen the functionality of this one.

- Frontend Overview

React JS with Redux was an easy choice. Having reliable states that components can interact with is extremely helpful and the line of data is easy to trace once you get the hang of it. I can't say enough good things about React with Redux and can't see myself using anything else unless absolutely necessary.

- Installing and Running the application.

Clone the repository and in the root folder of the repository run  'pipenv install' in the console. This will install all the dependencies for the application. Once the installation completes, you will enter the 'react-app' directory and run 'npm install' in the console. 

Next, create a .env file in your root folder of the repository and enter the information found in the '.env.example' file.  The information you enter in the .env file will need to match the data used when creating a user and database in postgresql.

Once you've got your database established and the .env updated, you're ready to migrate. In the root of your repository, run:

pipenv shell
flask db migrate
flask db seed all

Now you can run your app with some data. In the root of your repository run (while in your shell):

flask run

And in a separate terminal, enter your virtual environment and change to the 'react-app' directory and run:

npm start

React should automatically pull up your appliation in the browser.


- Authors


James Daniel Jr.
https://github.com/jdaniel01


- Acknowledgments

Adrian Degraff for outstanding guidance to help keep me on track and all the instructors and TA's at App Academy. You guys deliver an awesome program that ushered me into the world of software engineering.