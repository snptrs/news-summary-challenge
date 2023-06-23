class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainer = document.querySelector("#news-container");
  }

  displayNewsFromAPI() {
    this.client.loadNews(
      (data) => {
        this.model.setNews(data);
        this.displayNews();
      },
      () => {
        this.displayError();
      }
    );
  }

  displayNews() {
    const oldArticles = document.querySelectorAll(".article");
    oldArticles.forEach((article) => {
      article.remove();
    });

    const errorMessage = document.querySelectorAll("#error-message");
    errorMessage.forEach((message) => {
      message.remove();
    });

    const newArticles = this.model.getNews();

    newArticles.forEach((article) => {
      let div = document.createElement("div");
      div.classList.add("article");
      div.textContent = article.headline;
      this.mainContainer.append(div);
    });
  }

  displayError() {
    let p = document.createElement("p");
    p.id = "error-message";
    p.textContent = "Ooops, something went wrong!";
    this.mainContainer.append(p);
  }
}

module.exports = NewsView;
