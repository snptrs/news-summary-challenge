const NewsModel = require("./newsModel");

describe("NewsModel", () => {
  describe(".setNews", () => {
    it("saves the latest news", () => {
      const model = new NewsModel();
      const data = {
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
      model.setNews(data);

      expect(model.getNews()[0].headline).toBe(
        "At last, the inventors of modern skiing have something to cheer: Dave Ryding | Andy Bull"
      );
      expect(model.getNews()[0].date).toBe("2022-02-02T14:42:43Z");
      expect(model.getNews()[0].url).toBe(
        "https://www.theguardian.com/sport/blog/2022/feb/02/at-last-the-inventors-of-modern-skiing-have-something-to-cheer-dave-ryding"
      );
      expect(model.getNews()[0].image).toBe(
        "https://media.guim.co.uk/1e2ab1ced5da6ecf8d7fcca9f87d5398c1d22336/0_119_6480_3888/500.jpg"
      );
    });
  });

  describe(".getNews", () => {
    it("retrieves the news", () => {
      const model = new NewsModel();
      expect(model.getNews()).toEqual([]);
    });
  });
});
