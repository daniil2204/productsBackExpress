import request from "supertest";
import { app } from "../../src/app";

// додати типізацію

const getRequest = () => {
  if (process.env.DBName === "samyraiBackTests") {
    return request(app);
  }
  console.log("BAD");
  throw new Error("you should change DB!!");
};

describe("/testData", () => {
  beforeAll(async () => {
    await getRequest().delete("/testData");
  });
  it("Should return empty array", async () => {
    await getRequest().get("/testData").expect(200, []);
  });
  it("Should return 404 for not existing products", async () => {
    await getRequest().get("/testData/-100").expect(404);
  });
  it("should not create a new product with correct data", async () => {
    newTestProduct1 = {
      title: "test1",
    };
    await getRequest().post("/testData").send(newTestProduct1).expect(400);

    await getRequest().get("/testData").expect(200, []);
  });
  let newTestProduct1: any = null;
  it("should create a new product with correct data", async () => {
    const createResponce = await getRequest()
      .post("/testData")
      .send({
        title: "test1",
        price: 34,
        count: 5,
      })
      .expect(201);

    newTestProduct1 = createResponce.body;

    expect(newTestProduct1).toEqual({
      id: expect.any(String),
      ...newTestProduct1,
    });

    await getRequest().get("/testData").expect(200, [newTestProduct1]);
  });
  it("should not update newTestProduct1 with incorrect data", async () => {
    await getRequest()
      .put(`/testData/${newTestProduct1.id}`)
      .send({
        title: "",
      })
      .expect(400);

    await getRequest().get("/testData").expect(200, [newTestProduct1]);
  });
  it("should not update newTestProduct1 with incorrect req url", async () => {
    await getRequest()
      .put(`/testData/-100`)
      .send({
        title: "correct title",
      })
      .expect(404);

    await getRequest().get("/testData").expect(200, [newTestProduct1]);
  });

  let newTestProduct2: any = null;
  it("should create a new product2 with correct data", async () => {
    const createResponce = await getRequest()
      .post("/testData")
      .send({
        title: "test2",
        price: 34,
        count: 5,
      })
      .expect(201);

    newTestProduct2 = createResponce.body;

    expect(newTestProduct2).toEqual({
      id: expect.any(String),
      ...newTestProduct2,
    });

    await getRequest()
      .get("/testData")
      .expect(200, [newTestProduct1, newTestProduct2]);
  });

  it("should update newTestProduct1", async () => {
    await getRequest()
      .put(`/testData/${newTestProduct1.id}`)
      .send({
        title: "update test",
        count: 5,
        price: newTestProduct1.price,
      })
      .expect(201, { ...newTestProduct1, title: "update test" });

    await getRequest()
      .get(`/testData/${newTestProduct2.id}`)
      .expect(newTestProduct2);
  });

  it("should delete newTestProduct1", async () => {
    await getRequest().delete(`/testData/${newTestProduct1.id}`).expect(204);

    await getRequest().get("/testData").expect(200, [newTestProduct2]);
  });

  it("should delete newTestProduct2", async () => {
    await getRequest().delete(`/testData/${newTestProduct2.id}`).expect(204);

    await getRequest().get("/testData").expect(200, []);
  });
  it("Should return empty array", async () => {
    await getRequest().get("/testData").expect(200, []);
  });
});
