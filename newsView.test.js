/**
 * @jest-environment jsdom
 */

const NewsView = require("./newsView");
const NewsModel = require("./newsModel");
const NewsClient = require("./newsClient");
const fs = require("fs");

require("jest-fetch-mock").enableMocks();
jest.mock("./newsClient");

const apiResult = {
  response: {
    results: [
      {
        webPublicationDate: "2022-02-02T14:42:43Z",
        webTitle:
          "At last, the inventors of modern skiing have something to cheer: Dave Ryding | Andy Bull",
        webUrl:
          "https://www.theguardian.com/sport/blog/2022/feb/02/at-last-the-inventors-of-modern-skiing-have-something-to-cheer-dave-ryding",
        fields: {
          thumbnail:
            "https://media.guim.co.uk/1e2ab1ced5da6ecf8d7fcca9f87d5398c1d22336/0_119_6480_3888/500.jpg",
        },
      },
    ],
  },
};

describe("NewsView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("display notes from API", () => {
    const model = new NewsModel();
    const mockClient = new NewsClient();

    mockClient.loadNews.mockImplementation((callback) => {
      callback(apiResult);
    });

    const view = new NewsView(model, mockClient);
    view.displayNewsFromAPI();

    expect(document.querySelectorAll("div.article").length).toBe(1);
    expect(document.querySelector("div.article").textContent).toBe(
      "At last, the inventors of modern skiing have something to cheer: Dave Ryding | Andy Bull"
    );
  });
});
