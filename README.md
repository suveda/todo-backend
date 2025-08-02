Todo App - Backend API

Prerequisites

1. Node.js (v18 or higher)
2. MySQL (v8.0 or higher)
3. npm


## Getting Started

1. Clone and install the dependencies:
   
   `git clone https://github.com/suveda/todo-backend.git`
   
   `cd todo-backend`

   `npm install`

2. Setup the database

   Download and install MYSQL and create a database by running the below commands in a MYSQL commandline:

   -- Connect to MySQL as root

    `mysql -u root -p`

    -- Create database

   `CREATE DATABASE todo_db;`

    -- Create a user for example like below:

    `CREATE USER 'todouser'@'localhost' IDENTIFIED BY 'todo123';`

    `GRANT ALL PRIVILEGES ON todo_db.* TO 'todouser'@'localhost';`

    `FLUSH PRIVILEGES;`

    `exit;`

3. Configure the virtual environment by creating a `.env` file in the root directory and populating your sql username and password in the URL:

   `DATABASE_URL="mysql://[username]:[password]@localhost:3306/todo_db"`

   `PORT=8000`

   `NODE_ENV=development`

4. Initialize database with Prisma

   `npx prisma generate`

   `npx prisma db push`

5. Start backend server in another terminal using :

   `npm run dev`

6. Verify if backend is running in below two links:

  - API runs on: `http://localhost:8000`
    
  - Test endpoint: `http://localhost:8000/api/tasks`


7. To view the backend population into Prisma database, open another terminal and run the below command:

   `npx prisma studio`

   Testendpoint : `http://localhost:5555` ( This opens up a browser GUI with populated tasks and each time a modification is done it gets updated here like shown in the below image on testing)

   <img width="1687" height="302" alt="image" src="https://github.com/user-attachments/assets/724ef66e-94ef-4d7d-b895-f1e0169521ae" />


   **NOTE** : To see the complete application in action:
1. Initialize database with Prisma commands
2. Start the backend server (`npm run dev`) in one terminal
3. Start the frontend server (`npm run dev`) in another terminal
4. Start prisma studio in a third terminal to view the database being populated



   

   
