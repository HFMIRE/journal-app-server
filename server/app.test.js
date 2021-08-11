const app = require("./app");
const request = require("supertest");
const { User, Entries } = require("./db");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Arrange, Act and Assert

describe("Backend Server Journal App", () => {
  //   test("Can POST - Login a User", async () => {
  //     //Arrange
  //     const username = "Maryam";
  //     const password = "password1234";
  //     const response = await request(app)
  //       .post("/users")
  //       .send({ username, password });
  //     expect(response.status).toBe(201);
  //   });
  test("Can POST - Login a User", async (done) => {
    let obj = {
      username: "Maryam",
      password: "mexico123",
    };
    const { body } = await request(app).post("/login").send(obj);
    expect(body).toEqual({
      status: "success",
      username: "Maryam",
      password: "mexico123",
    });
  });
});
