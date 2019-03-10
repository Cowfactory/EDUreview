import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ReviewsListEntry from '../../components/ReviewsListEntry/ReviewsListEntry';

class ProgramDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            institutionName: '',
            types: [],
            locations: [],
            reviews: []
        };
    }

    componentDidMount() {
        fetch(`/api/programs/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState(data);
            });
        // .then(() => {
        //     this.state.reviews.forEach(review => {
        //         this.fetchUserAndPushToState(review.user);
        //     });
        // });
    }

    fetchUserAndPushToState = id => {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(this.state.reviews);
                // this.setState(({reviews}) => {
                //     reviews: reviews
                // })
            });
        // fetch(`/api/reviews/${id}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState(state => {
        //             let arr = state.reviews || [];
        //             arr.push(data);
        //             return { asdf: arr };
        //         });
        //     });
    };

    render() {
        return (
            <PageTemplate>
                <h1>{this.state.name}</h1>
                <h2>{this.state.institutionName}</h2>
                <h3>Type(s): {this.state.types}</h3>
                <h3>Location(s): {this.state.locations}</h3>

                <br />
                <Link to={`/programs/${this.props.match.params.id}/addreview`}>
                    Add a review for this program
                </Link>
                <h2>Reviews: </h2>
                {this.state.reviews.map((review, idx) => (
                    <ReviewsListEntry key={idx} review={review.review} />
                ))}
            </PageTemplate>
        );
    }
}

export default ProgramDetailsPage;
