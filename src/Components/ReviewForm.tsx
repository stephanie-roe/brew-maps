import React from 'react';
import '../Styles/ReviewForm.css';
import { Route, RouteComponentProps } from 'react-router-dom';
import Review from './Review';

type ReviewFormProps = {
    id: string,
    fetchData: () => any
}

type ReviewFormState = {
    reviews: ReviewObject[],
    id: string,
    name: string,
    review: string
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
        reviews: []
    }

    // componentDidMount() {
    //     // console.log(this.props.id)
    //   fetch(`http://localhost:3001/api/v1/reviews`)
    //   .then(response => {
    //       if (response.ok) {
    //           return response.json()
    //       } else {
    //           throw Error(response.statusText)
    //       }
    //   })
    //   .then(data => {
    //       const filteredData = data.filter(review => review.id === this.props.id)
    //       this.setState({ reviews: filteredData })
    //   })
    //   .catch(error => console.log("error"))
    // }

    componentDidMount() {
      const data = this.props.fetchData()
        const filteredData = await data.filter(review => review.id === this.props.id)
        this.setState({ reviews: filteredData })
      // console.log(data);

      // const filteredData = data.filter(review => review.id === this.props.id)
      // this.setState({ reviews: filteredData })
    }


    handleChange = (event: any): void => {
      if (event.target.name === 'name') {
        this.setState({ name: event.target.value })
      } else if (event.target.name === 'review') {
        this.setState({ review: event.target.value })
      }
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
        this.setState({ reviews: [...this.state.reviews, {
        id: this.props.id,
        name: this.state.name,
        review: this.state.review
       }] })
      })
      .catch(error => console.log('errrrror')
      )
    }



    render() {
      const result = this.state.reviews.map(review => {
        return <Review details={review} key={this.state.reviews.indexOf(review)} />
      })
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

    //review form is the container that holds the form for review submission and the individual review components.


}

export default ReviewForm;
