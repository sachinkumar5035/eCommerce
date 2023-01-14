import { Rating } from '@mui/material';
import React from 'react';
import profilepng from '../../Images/Profile.png'

const ReviewCard = ({review}) => {


    const options = {
        size:"large",
        value:review.rating,
        precison:.5,
    };

  return (
    <div className='reviewCard'>
      <img src={profilepng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}/>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
