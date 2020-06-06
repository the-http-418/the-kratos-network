import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'

export default class Ratings extends Component {
    state = {
      rating:parseInt(this.props.rating)
    }
    render() {
        return (
          <StarRatings
            rating={this.state.rating}
            starRatedColor="purple"
            starEmptyColor="grey"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="2px"
          />
        );
      }
}
