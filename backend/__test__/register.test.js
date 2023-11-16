const { it } = require("node:test");
const app = require("../app");
const request = require("supertest");


describe("register", () => {
    it("returns status code 200 if all credentials are given", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                username: "tony",
                email: "tony@tony.com",
                password: "123"
            });
        expect(res.statusCode).toEqual(200);
    });

    it("returns status code 400 if not all credentials are given", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                username: "",
                email: "max@max.com",
                password: "123"
            });
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toEqual("Valid details were not provided. Check username, email and password have been given.")
    });

    it("returns status code of 400 and gives a message if a user tries to register with an email that is already registered", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                username: "bob",
                email: "bob@bob.com",
                password: "123"
            });
        expect(res.statusCode).toEqual(400)
    })  
})

