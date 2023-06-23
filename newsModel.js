class NewsModel {
  constructor() {
    this.news = [];
  }

  getNews() {
    return this.news;
  }

  setNews(news) {
    news.response.results.forEach((item) => {
      const newsObject = {
        date: item.webPublicationDate,
        headline: item.webTitle,
        url: item.webUrl,
        image: item.fields.thumbnail,
      };
      this.news.push(newsObject);
    });
  }
}

module.exports = NewsModel;
