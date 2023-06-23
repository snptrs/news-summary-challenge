const NewsClient = require("./newsClient");

require("jest-fetch-mock").enableMocks();

describe("News client class", () => {
  it("loads new data from the API", (done) => {
    const client = new NewsClient();

    fetch.mockResponseOnce(
      JSON.stringify({
        content: "Some value",
      })
    );

    client.loadNews((returnedDataFromApi) => {
      expect(returnedDataFromApi.content).toBe("Some value");

      done();
    });
  });
});
