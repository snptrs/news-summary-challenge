class NewsClient {
  loadNews(successCallback, errorCallback) {
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get("api-key");
    fetch(
      "https://content.guardianapis.com/search?q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=" +
        apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        successCallback(data);
      })
      .catch(() => errorCallback());
  }
}

module.exports = NewsClient;
