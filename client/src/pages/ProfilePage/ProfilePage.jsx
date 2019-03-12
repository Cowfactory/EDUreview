import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import withAuth from '../../components/withAuth/withAuth';
import { Redirect } from 'react-router-dom';
import ReviewsListEntry from '../../components/ReviewsListEntry/ReviewsListEntry';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            redirect: false
        };
    }
    componentDidMount() {
        if (!this.props.user) {
            this.setState({ redirect: true });
        } else {
            fetch(`/api/reviews/search?uid=${this.props.user._id}`)
                .then(result => result.json())
                .then(reviews => {
                    this.setState({ reviews });
                });
        }
    }
    render() {
        if (this.state.redirect) return <Redirect to="/login" />;
        return (
            <PageTemplate>
                <div>
                    Reviews:
                    {this.state.reviews.map((review, key) => (
                        <ReviewsListEntry key={key} review={review}></ReviewsListEntry>
                    ))}
                </div>
            </PageTemplate>
        );
    }
}

export default withAuth(ProfilePage);
