import React from 'react';
import '../Styles/Review.css';
import { ReviewObject } from './ReviewForm';

type ReviewProps = {
  details: ReviewObject;
}

const Review = ({ details }: ReviewProps): JSX.Element => {
  return (
    <div className='review' id={ details.id }>
      <p className="user-name">{ details.name }</p>
      <p className="review-message">{ details.review }</p>
    </div>
  )
}

export default Review;
