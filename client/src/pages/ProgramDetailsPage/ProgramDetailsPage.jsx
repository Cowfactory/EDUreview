import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ReviewsListEntry from '../../components/ReviewsListEntry/ReviewsListEntry';

class ProgramDetailsPage extends React.Component {
    state = {
        name: '',
        institutionName: '',
        types: [],
        locations: [],
        reviews: []
    };

    componentDidMount() {
        fetch(`/api/programs/${this.props.match.params.id}`)
            .then(response => response.json()) // fetch program from API
            .then(data => {
                const { name, types, reviews, locations } = data;
                this.setState({
                    name,
                    types,
                    locations,
                    reviews
                });
                return data;
            })
            .then(data => {
                // Acquire username for each review from API
                return data.reviews.map(review => this.fetchUsername(review._id));
            })
            .then(promises => {
                return Promise.all(promises);
            })
            .then(reviews => {
                this.setState({ reviews });
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchUsername = id => {
        return new Promise((resolve, reject) => {
            fetch(`/api/reviews/${id}`)
                .then(res => res.json())
                .then(review => {
                    resolve(review);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    render() {
        return (
            <PageTemplate>
                <h1>{this.state.name}</h1>
                <h2>{this.state.institutionName}</h2>
                <h3>Type(s): {this.state.types}</h3>
                <h3>Location(s): {this.state.locations}</h3>

                <br />
                <Link to={{
                    pathname: `/programs/${this.props.match.params.id}/addreview`,
                    state: {
                        program: {
                            name: this.state.name,
                            institutionName: this.state.institutionName,
                            types: this.state.types,
                        }
                    }
                }}>
                    Add a review for this program
                </Link>
                <h2>Reviews: </h2>
                {this.state.reviews.map((review, idx) => (
                    <ReviewsListEntry key={idx} user={review.user} review={review.review} />
                ))}
            </PageTemplate>
        );
    }
}

export default ProgramDetailsPage;
