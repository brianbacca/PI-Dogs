const { Dog, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({ name: "Mora" });
      });

      it("should have a breed name", (done) => {
        Dog.create({
          id: 23,
          height_min: 19,
          height_max: 29,
          weight_min: 4,
          weight_max: 12,
        })
          .then(() => done("should not have been created"))
          .catch(() => done());
      });
      it("should have a breed height_min", (done) => {
        Dog.create({
          name: "mora",
          height_max: 29,
          weight_min: 4,
          weight_max: 12,
        })
          .then(() => done("should not have been created"))
          .catch(() => done());
      });
      it("should have a breed height_max", (done) => {
        Dog.create({
          name: "mora",
          height_min: 19,
          weight_min: 4,
          weight_max: 12,
        })
          .then(() => done("should not have been created"))
          .catch(() => done());
      });
      it("should have a breed weight_min", (done) => {
       Dog.create({
         name: "mora",
         height_min: 19,
         height_max: 29,
         weight_max: 12,
       })
         .then(() => done("should not have been created"))
         .catch(() => done());
      });
      it("should have a breed weight_max", (done) => {
        Dog.create({
          name: "mora",
          height_min: 19,
          height_max: 29,
          weight_min: 4,
        })
          .then(() => done("should not have been created"))
          .catch(() => done());
      });
    });
  });
});
