import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends Component {

    state = {
        reviews: [],
        searchTerm: ''
    }

    componentDidMount()  {
        fetch(URL.concat(this.state.searchTerm))
        .then(resp => resp.json())
        .then(reviews => this.setState({reviews: reviews.results}))
    }

    handleSearch = (event) => {
        this.setState({searchTerm: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        console.log(this.handleSearch, 'hitting this?')
        return(
            <div className='searchable-movie-reviews'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search-input">
                        Search Movie Reviews
                    </label>
                    <input type='text' 
                    id='search-input'
                    style={{width: 300}} 
                    onChange={this.handleSearch}/>
                    <button type='submit'>Submit</button>
                </form>
                {typeof this.state.reviews === 'object' && 
                this.state.reviews.length > 0 && <h2>Movie Review by Search:</h2>}
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer;