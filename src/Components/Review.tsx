import React from 'react';
import '../Styles/Review.css';
import { ReviewObject } from './ReviewForm';

type ReviewProps = {
  details: ReviewObject;
}

const Review = ({ details }: ReviewProps): JSX.Element => {
  // console.log(details)
  return (
    <div className='review' id={details.id}>
      <p>{details.name}</p>
      <p>{details.review}</p>
    </div>
  )
}


export default Review;
