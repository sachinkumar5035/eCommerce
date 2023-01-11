import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


const ProductCard = ({ product }) => {

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 20, 0.1)",
    activColor: "tomato",
    size: window.innerWidth < 600 ? 21 : 20,
    value: product.ratings,
    isHalf: true, // fraction of star will be filled in rating
  }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> {" "} 
        <span className='productCardSpan'> {" "} ({product.NumberOfReviews} Reviews )</span>
      </div>
      <span> {`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;