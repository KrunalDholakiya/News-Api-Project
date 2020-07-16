// Library components
import React from "react";
import { Tabs, Input } from "antd";

//styles
import "./assets/styles/app.scss";
import "./assets/styles/base.scss";

//images and icons
import flag from "./assets/images/flag.jpg";

//custom compnents
import NewsList from "./components/list";

const { TabPane } = Tabs;
const { Search } = Input;

class App extends React.Component {
  constructor() {
    super();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    this.state = {
      date: dateTime,
      articles: [],
      search_keyword: "",
    };
  }

  renderNewsList = (category) => {
    return (
      <NewsList
        category={category}
        keyword={this.state.search_keyword}
        data={this.state.articles}
      ></NewsList>
    );
  };

  searchByKeyword = (value) => {
    this.setState({ search_keyword: value });
  };
  render() {
    return (
      <div className="home-page">
        <div className="header">
          <img className="header-icon" src={flag}></img>
          <span className="header-title"> The UK News</span>
        </div>
        <center>
          <div className="divider"></div>
          <div className="data-time">{this.state.date}</div>
          <div className="divider"></div>
        </center>
        <div className="tab-container">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size={"small"}
            onTabClick={this.onTabChange}
          >
            <TabPane tab="Top News" key="1">
              <Search
                placeholder="Search By Keyword"
                onSearch={(value) => this.searchByKeyword(value)}
                enterButton
              />
              {this.renderNewsList(1)}
            </TabPane>
            <TabPane tab="Business" key="2">
              {this.renderNewsList(2)}
            </TabPane>
            <TabPane tab="Entertainment" key="3">
              {this.renderNewsList(3)}
            </TabPane>
            <TabPane tab="Health" key="4">
              {this.renderNewsList(4)}
            </TabPane>
            <TabPane tab="Science" key="5">
              {this.renderNewsList(5)}
            </TabPane>
            <TabPane tab="Sports" key="6">
              {this.renderNewsList(6)}
            </TabPane>
            <TabPane tab="Technology" key="7">
              {this.renderNewsList(7)}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
