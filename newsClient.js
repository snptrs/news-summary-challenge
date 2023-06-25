class NewsClient {
  loadNews(successCallback, errorCallback, searchTerm = "") {
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get("api-key");
    searchTerm = encodeURIComponent(searchTerm);
    fetch(
      `https://content.guardianapis.com/search?q=${searchTerm}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        successCallback(data);
      })
      .catch(() => errorCallback());
  }

  loadSummary(successCallback, errorCallback) {
    const urlParams = new URLSearchParams(window.location.search);
    const kagiKey = urlParams.get("kagi-key");
    const headers = { Authorization: `Bot ${kagiKey}` };
    articleURL = "";

    fetch("https://kagi.com/api/v0/summarize?engine=muriel&url=" + articleURL)
      .then((response) => response.json())
      .then((data) => {
        successCallback(data);
      })
      .catch(() => errorCallback());
  }
}

module.exports = NewsClient;
