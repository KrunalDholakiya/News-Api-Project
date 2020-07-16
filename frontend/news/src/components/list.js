// Library components
import React from "react";
import { List, Avatar, Button, Skeleton } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import constants from "../constants";
export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      loading: false,
      data: [],
      list: [],
      news_count: 10,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    this.getData(this.props.keyword, (res) => {
      this.setState({
        initLoading: false,
        data: res.data.articles,
        list: res.data.articles,
        totalResults: res.data.totalResults,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyword !== nextProps.keyword) {
      this.getData(nextProps.keyword, (res) => {
        this.setState({
          initLoading: false,
          data: res.data.articles,
          list: res.data.articles,
          totalResults: res.data.totalResults,
        });
      });
    }
  }

  getData = (keyword, callback) => {
    let map = {
      1: "top_headlines",
      2: "business",
      3: "entertainment",
      4: "health",
      5: "science",
      6: "sports",
      7: "technology",
    };

    let url = "";
    if (this.props.category === 1 && keyword === "") {
      url = `${constants.get_top_headlines}?page_size=${this.state.news_count}&page=${this.state.page}`;
    } else if (this.props.category === 1 && keyword !== "") {
      url = `${constants.get_news_by_keywords}?keyword=${keyword}&page_size=${this.state.news_count}&page=${this.state.page}`;
    } else {
      url = `${constants.get_news_by_categories}?category=${
        map[this.props.category]
      }&page_size=${this.state.news_count}&page=${this.state.page}`;
    }

    axios.get(url).then((res) => {
      callback(res);
    });
  };

  onLoadMore = () => {
    this.setState(
      {
        loading: true,
        list: this.state.data.concat(
          [...new Array(this.state.news_count)].map(() => ({
            loading: true,
            title: {},
          }))
        ),
        page: this.state.page + 1,
      },
      () => {
        this.getData(this.props.keyword, (res) => {
          const data = this.state.data.concat(res.data.articles);

          this.setState(
            {
              data,
              list: data,
              loading: false,
            },
            () => {
              window.dispatchEvent(new Event("resize"));
            }
          );
        });
      }
    );
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading &&
      !loading &&
      this.state.data.length < this.state.totalResults ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.urlToImage} />}
                title={
                  <Link to={{ pathname: "/story", data: item }}>
                    {item.title}
                  </Link>
                }
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
