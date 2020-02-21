import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component {
    state = {
        reviews: [],
        searchTerm: ''
    }

    updateSearchTerm = (searchTerm) => {
        this.setState({ searchTerm })
    }

    searchReview = (event) => {
        event.preventDefault()
        fetch(`${URL}&query=${this.state.searchTerm}`)
            .then(resp => resp.json())
            .then(json => this.setState({ reviews: json.results }))
    }

    render() {
        return (
            <div className="searchable-movie-reviews">
                <form onSubmit={(event) => this.searchReview(event)}>
                    <input value={this.state.searchTerm} onChange={(event) => this.updateSearchTerm(event.target.value)} />
                </form>
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}