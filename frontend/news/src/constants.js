let api_host = "http://localhost:";
let api_port = "5000";
let constants = {
  get_top_headlines: api_host + api_port + "/news/topheadlines",
  get_news_by_categories: api_host + api_port + "/news/categories",
  get_news_by_keywords: api_host + api_port + "/news/search",
};

export default constants;
