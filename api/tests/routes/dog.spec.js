/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Temperament, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Mora",
  height_min: 19,
  height_max: 29,
  weight_min: 4,
  weight_max: 12,
};

describe("Dog routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));

  describe("GET /dogs", () => {
    it("searching all dogs", () => agent.get("/dogs").expect(200));
    it("should get 200 when searching rhe specific dog name", () =>
      agent.get("/dogs?name=Mora").expect(200));
    it("should get 404 when searching a incorrect dog`s name", () =>
      agent.get("/dogs?name=xzcvb").expect(400));
    it("should get a 200 status when id is found", () => {
      agent.get("/dogs/3").expect(200);
    });
    it("should get a 400 status when dogs id isnt found", () => {
      agent.get("/dogs/123a23").expect(400);
    });
  });

  beforeEach(() => Temperament.sync({ force: true }));
  describe("GET /temperament", () => {
    it("searching all temperaments in the dogs api", () => {
      return Temperament.create({})
        .then(() => {
          return agent.get("/temperaments").expect(200);
        })
        .then((Temperaments) => {
          expect(Temperaments.body[0]).to.equal("Stubborn");
          expect(Temperaments.body[10]).to.equal("Happy");
        });
    });
  });

  describe("POST /dog", () => {
    it("it should return a new dog", () => {
      agent
        .post("/dog")
        .send({
          name: "Pancho",
          life_span: "12 years",
          temperament: ["Stubborn", "Curious", "Playful", "Adventurous"],
          height_min: 20,
          height_max: 40,
          weight_min: 21,
          weight_max: 40,
          image:
            "https://prod-api.theobjective.com/app/uploads/2017/11/el-sindrome-del-perro-negro-mito-o-realidad.jpg",
        })
        .expect(200);
    });
    it("should get 400 if  params were not register", () => {
      agent
        .post("/dog")
        .send({
          life_span: "12 years",
          temperament: ["Stubborn", "Curious", "Playful", "Adventurous"],
          height_min: 20,
          height_max: 40,
          weight_min: 21,
          weight_max: 40,
        })
        .expect(400);
    });
  });
});
