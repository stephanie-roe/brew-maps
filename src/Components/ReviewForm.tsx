import React from 'react';
import '../Styles/ReviewForm.css';
import { Route, RouteComponentProps } from 'react-router-dom';

type ReviewFormProps = {
    id: string
}

type ReviewFormState = {
    reviews: ReviewObject[],
    name: string,
    content: string,
    // do we need id here?
}

type ReviewObject = {
    id: string,
    name: string,
    content: string
}

class ReviewForm extends React.Component<ReviewFormProps, ReviewFormState> {
    state: ReviewFormState = {
        name: "",
        content: "",
        reviews: []
    }

    componentDidMount() {
        console.log(this.props.id)
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
            // we will render the form as well as map over the reviews and show them on the DOM.
        <div className='reviews'>
          {result}
        </div>
      )
    }

    //review form is the container that holds the form for review submission and the individual review components.


}

export default ReviewForm;
