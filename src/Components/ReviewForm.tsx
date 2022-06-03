import React from 'react';
import '../Styles/ReviewForm.css';
import { Route, RouteComponentProps } from 'react-router-dom';
import Review from './Review';

type ReviewFormProps = {
    id: string
}

type ReviewFormState = {
    reviews: ReviewObject[],
    name: string,
    review: string,
    // do we need id here?
}

export type ReviewObject = {
    id: string,
    name: string,
    review: string
}

class ReviewForm extends React.Component<ReviewFormProps, ReviewFormState> {
    state: ReviewFormState = {
        name: "",
        review: "",
        reviews: []
    }

    componentDidMount() {
        // console.log(this.props.id)
      fetch(`http://localhost:3001/api/v1/reviews`)
      .then(response => {
          if (response.ok) {
              return response.json()
          } else {
              throw Error(response.statusText)
          }
      })
      .then(data => {
          const filteredData = data.filter(review => review.id === this.props.id)
          this.setState({ reviews: filteredData })
      })
      .catch(error => console.log("error"))
    }

    render() {
      const result = this.state.reviews.map(review => {
        return <Review details={review} key={this.state.reviews.indexOf(review)} />
      })
      return (
        <div>
          <form className='review-form'>
            <input className='name' type='text' placeholder='name (optional)' value={this.state.name} />
            <input className='review-contents' type='text' placeholder='review here' value={this.state.review} />
            <button className='submit-review-btn'>Submit Review</button>
          </form>
          <div className='reviews'>
            {result}
          </div>

        </div>
      )
    }

    //review form is the container that holds the form for review submission and the individual review components.


}

export default ReviewForm;
