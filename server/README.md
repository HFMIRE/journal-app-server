# Journal App - Vent.

This project goal is to create a secure Journal App for security conscious users. The Journal app is where you can store entries and can edit as well as delete the entry or user.

## Tech Stack

**Client:** React, Material Ui

**Server:** Sequlize, Express, NodeJs.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Deployment

Server (Backend) - To deploy this project run

```bash
   cd server
```

```bash
   npm i or npm install
```

```bash
   nodemon
```

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

One of the challenges I faced was with the authentication and authorisation aspect of this project. I think understanding the concept and applying it was difficult. I solve that problem by using local storage when I was authorising the JWT token in the frontend and using middleware to verify the token on each request to ensure that the request is secure.
