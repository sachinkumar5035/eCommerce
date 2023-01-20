import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';


const ProductCard = ({ product }) => {

  const options = {
    // size: "large",
    value: product.ratings,
    precision:.5, // fraction of star will be filled in rating
    readOnly:true
  }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className='productCardSpan'> ({product.NumberOfReviews} Reviews) </span>
      </div>
      <span> {`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;