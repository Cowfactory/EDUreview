import React, { Component } from 'react';
import NavBox from '../../components/NavBox/NavBox';

class ReviewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviewsList: []
        }

    }

    componentDidMount() {
        fetch('/api/reviews')
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({ 
                reviewsList: data
            })
        })
    }

    render() {
        return (
            <div>
                <NavBox />
                <ul>
                    { this.state.reviewsList.map((review, idx) => <li key={idx}>{ review.review }</li>) }
                </ul>
            </div>
        )
    }
}

export default ReviewsPage;