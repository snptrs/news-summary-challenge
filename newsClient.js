class NewsClient {
  loadNews(successCallback, errorCallback, searchTerm = "") {
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get("api-key");
    searchTerm = encodeURIComponent(searchTerm);
    fetch(
      `https://content.guardianapis.com/search?q=${searchTerm}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&page-size=12&api-key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        successCallback(data);
      })
      .catch(() => errorCallback());
  }

  loadSummary(successCallback, errorCallback, articleURL) {
    const urlParams = new URLSearchParams(window.location.search);
    const openAiKey = urlParams.get("openai-key");
    articleURL = encodeURIComponent(articleURL);

    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `${articleURL}\nTl;dr:`,
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        successCallback(data);
      })
      .catch(() => errorCallback());
  }
}

module.exports = NewsClient;
