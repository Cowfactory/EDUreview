import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

class BreadCrumb extends React.Component {
  state = {
    redirect: false
  };
  render() {
    return (
      <Breadcrumb>
        <Link to="/">Home</Link>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Link to="/search">Search</Link>
        <Breadcrumb.Item active>{this.state.name}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default BreadCrumb;
