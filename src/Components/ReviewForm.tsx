import React from 'react';
import '../Styles/ReviewForm.css';
import { Route, RouteComponentProps } from 'react-router-dom';
import Review from './Review';
import { Link } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';

type ReviewFormProps = {
  refresh: (reviews: ReviewObject[], filteredReviews: ReviewObject[]) => void,
  filteredReviews: ReviewObject[],
  id: string,
  reviews: ReviewObject[]
}

type ReviewFormState = {
  filteredReviews: ReviewObject[],
  id: string,
  name: string,
  review: string,
  submissionStatus: boolean
}

export type ReviewObject = {
  id: string,
  name: string,
  review: string
}

class ReviewForm extends React.Component<ReviewFormProps, ReviewFormState> {
    state: ReviewFormState = {
        id: this.props.id,
        name: '',
        review: '',
        filteredReviews: [],
        submissionStatus: false
    }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/reviews')
    .then(res => res.json())
    .then(data => {
        const filteredRev = data.filter(review => review.id === this.state.id )
        this.setState({ filteredReviews: filteredRev })
    })
  }

  handleChange = (event: any): void => {
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value })
    } else if (event.target.name === 'review') {
      this.setState({ review: event.target.value })
    }

    this.setState({ submissionStatus: false })
  }

  handleClick = (event: any): void => {
    event.preventDefault();
    fetch(`http://localhost:3001/api/v1/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        "id": this.props.id,
        "name": this.state.name,
        "review": this.state.review
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response)

      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(data => {
      this.setState({ filteredReviews: [...this.state.filteredReviews, {
      id: this.props.id,
      name: this.state.name,
      review: this.state.review
      }] })
    })
    .catch(error => console.log('errrrror'))
    this.props.refresh(this.props.reviews, this.props.filteredReviews)

    this.setState({ submissionStatus: true })
  }

  render() {
    const result = this.state.filteredReviews.map(review => {
      return <Review details={review} key={this.state.filteredReviews.indexOf(review)} />
    })
    if (this.state.submissionStatus) {
      return <ConfirmationPage />
    } else {
      return (
        <div>
        <form className='review-form'>
          <input className='name' type='text' name='name' placeholder='name (optional)' value={this.state.name} onChange={event => this.handleChange(event)} />
          <input className='review-contents' type='text' name='review' placeholder='review here' value={this.state.review} onChange={event => this.handleChange(event)} />
            <button className='submit-review-btn' onClick={event => this.handleClick(event)}>Submit Review</button>
        </form>
        <div className='reviews'>
          {result}
        </div>
      </div>
      )
    }
  }
}

export default ReviewForm;
