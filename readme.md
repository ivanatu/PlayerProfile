# Introducing Player Platform

### About

In the application, we have a basic platform that helps players socialize and interact with each other through groups. 

### Technical Pitch

* Front-end built with React.js, and responsive CSS (Using flexbox, shadows, transitions, etc)
* Functional Components * Hooks (Modern React)
* Global State Management handled using Context APi and it's related hooks such as useReducer (Same architecture as Redux, 'Actions dispatches types to a reducer, changing a store provided down the component tree')
* REST APi built with Node.js, Express, and MongoDB (Mongoose). 
* User Authentication system built with JWT, with custom express middleware for private routes and user identification, and JWT-localStorage handling on the client for user sessions
* Passwords hashed in the database using BCryptJS, with JWT Secret not pushed to repository.


### Some Interesting Features

* A registration form for player with basic details. name, age, email, picture, etc.
* An authentication form, player should be able to login with username/password provided during registration.
* A player should be able to create a group (becoming the group admin).
* A player should be able to search for existing groups by name.
* A player should be able to join a group by request.
* A player should be able to send a buddy request.
* A player should be able to leave a group
* A player should be able to accept/decline a buddy request or a group invitation.
* A player should be able to list their invitations
* A player should be able to list their own group members.
* A group must always have an admin.
* A group must have a name and text description.
* A group admin should be able to see group member's profile.

### To Setup
Unzip the file

1. `cd PlayerProfile`
2. `npm install`
3. `cd client`
4. `npm install`

### To Run
To run node server
1. `cd PlayerProfile`
2. `npm start`

To run react frontend
1. `cd client`
2. `npm start`
