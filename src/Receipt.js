import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "./Receipt.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileImage,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";

export default class Receipt extends Component {
  constructor(props, context) {
    super(props, context);
    var img = faFilePdf;
    if (!this.props.pdf) img = faFileImage;
    this.state = {
      store: this.props.store,
      price: this.props.price,
      category: this.props.category,
      date: this.props.date,
      id: this.props.id,
      pic: img,
      display: "#F8F9FB",
      description: this.props.description
    };
  }
  trashCanVisible() {
    this.setState({ display: "black" });
  }
  trashCanAway() {
    this.setState({ display: "#F8F9FB" });
  }
  pop = id => {
    this.props.pop(this.state.id);
  };
  render() {
    const divStyle = {
      padding: "1em",
      border: "1px solid black"
    };
    const buttonStyle = {
      minWidth: "25em",
      maxWidth: "25em"
    };
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Button
          variant="light"
          onMouseOver={this.trashCanVisible.bind(this)}
          onMouseLeave={this.trashCanAway.bind(this)}
          style={buttonStyle}
        >
          <Container>
            <Row>
              <div style={divStyle}>
                <Col>
                  <FontAwesomeIcon icon={this.state.pic} size="8x" />
                </Col>
              </div>
              <Col lg="3">
                <table>
                  <tr>
                    <thead>{this.state.store}</thead>
                  </tr>
                  <tr>
                    <td>{this.state.date}</td>
                  </tr>
                  <tr>
                    <thead>${this.state.price}</thead>
                  </tr>
                  <tr>
                    <td bgcolor="#D3D3D3" style={{ padding: "0em 0em 0em 0em" }}>{this.state.category}</td>
                  </tr>
                  <tr>
                    <td>{this.state.description}</td>
                  </tr>
                </table>
              </Col>
              <Col lg="3">
                <Button variant="light" onClick={this.pop}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="1x"
                    color={this.state.display}
                  />
                </Button>
              </Col>
            </Row>
          </Container>
        </Button>
      </div>
    );
  }
}
