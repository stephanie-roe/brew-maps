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
        // fetch reviews by id 
    }

    render() {
        return (
            // we will render the form as well as map over the reviews and show them on the DOM. 
            <div></div>
        )
    }

    //review form is the container that holds the form for review submission and the individual review components. 


}

export default ReviewForm; 