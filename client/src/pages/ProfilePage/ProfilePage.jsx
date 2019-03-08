import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import withAuth from '../../components/withAuth/withAuth';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }
    componentWillMount() {
        console.log(this.props.user);
    }
    render() {
        return <PageTemplate />;
    }
}

export default withAuth(ProfilePage);
