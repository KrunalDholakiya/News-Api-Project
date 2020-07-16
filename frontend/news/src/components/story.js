import React from "react";
import "../assets/styles/story.scss";
export default class Story extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="story-container">
        <center>
          <img
            className="story-image"
            src={this.props.location.data.urlToImage}
          ></img>
        </center>
        <div className="story-meta">
          <span className="author">
            <b>Author:</b> {this.props.location.data.author}
          </span>
          <span className="published_at">
            <b>Published At:</b>{" "}
            {this.props.location.data.publishedAt.substring(0, 10) +
              " " +
              this.props.location.data.publishedAt.substring(11, 19)}
          </span>
          <a href={this.props.location.data.url} target="_blank">
            Source
          </a>
        </div>
        <div className="story-title">{this.props.location.data.title}</div>
        <div className="story-content">{this.props.location.data.content}</div>
      </div>
    );
  }
}
