class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainer = document.querySelector("#news-container");
    this.modal = document.getElementById("summaryModal");
    this.modalContent = document.getElementById("modal-content");

    this.searchEl = document.querySelector("#search");
    this.searchEl.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.displayNewsFromAPI();
        this.searchEl.value = "";
      }
    });

    const wrapper = document.getElementById("news-container");
    wrapper.addEventListener("click", (event) => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) {
        return;
      }
      this.modal.style.display = "block";
      this.displaySummary(event.srcElement.value);
    });

    const modalClose = document.getElementsByClassName("close")[0];
    modalClose.onclick = () => {
      this.modal.style.display = "none";
    };
    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    };
  }

  displaySummary(articleURL) {
    this.modalContent.textContent = "Loading summary...";
    this.client.loadSummary(
      (response) => {
        // Get the modal
        this.modalContent.textContent = response.choices[0].text;
      },
      () => {
        this.displayError();
      },
      articleURL
    );
  }

  displayNewsFromAPI() {
    this.client.loadNews(
      (data) => {
        this.model.setNews(data);
        this.displayNews();
      },
      () => {
        this.displayError();
      },
      this.searchEl.value
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

    newArticles.forEach((art) => {
      const articleEl = document.createElement("article");
      articleEl.classList.add("article");

      const imageEl = new Image(300);
      imageEl.src = art.image;
      articleEl.appendChild(imageEl);

      const textEl = document.createElement("div");
      textEl.textContent = art.headline;
      textEl.classList.add("headline");
      articleEl.appendChild(textEl);

      const buttonsEl = document.createElement("div");
      buttonsEl.classList.add("buttons");
      const readMore = document.createElement("a");
      readMore.href = art.url;
      readMore.textContent = "Read article";
      readMore.classList.add("button");
      buttonsEl.appendChild(readMore);

      const summarise = document.createElement("button");
      summarise.name = "url";
      summarise.value = art.url;
      summarise.textContent = "Summarise";
      summarise.classList.add("button");
      summarise.classList.add("summarise-button");
      buttonsEl.appendChild(summarise);

      articleEl.appendChild(buttonsEl);

      this.mainContainer.append(articleEl);
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
