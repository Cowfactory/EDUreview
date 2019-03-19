import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

class BreadCrumb extends React.Component {
    state = {
        redirect: false
    };
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>{this.state.name}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}

export default BreadCrumb;
