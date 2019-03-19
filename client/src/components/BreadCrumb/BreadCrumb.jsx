import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbItem from 'react-bootstrap/BreadcrumbItem';


class BreadCrumb extends React.Component {
    render() {
        const links = this.props.children;
        return (
            <Breadcrumb>
                {links.map((link, idx) => {
                    if (idx === links.length - 1) {
                        return <BreadcrumbItem key={idx} active>{link}</BreadcrumbItem>
                    }
                    else if (typeof link === "string") {
                        return <div key={idx}>
                            <BreadcrumbItem active>{link} /&nbsp;</BreadcrumbItem>
                        </div>
                    }
                    else {
                        return <span key={idx}>
                            {link} <span>/ &nbsp;</span>
                        </span>
                    }
                })}
            </Breadcrumb>
        );
    }
}

export default BreadCrumb;
