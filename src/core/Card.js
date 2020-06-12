import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({ product }) => {
    return (
        
            <div className='card'>
                <div className='card-header'>{product.name}</div>
                <ShowImage item={product} url="product"/>
                <div className='card-body'>
                    <p>{product.description.substring(0,100)}</p>
                    <p>{product.price}</p>
                    <Link to={`/product/${product._id}`}>
                        <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                            View Product
                       </button>
                    </Link>
                    <button className='btn btn-outline-warning mt-2 mb-2'>
                        Add to Cart
                       </button>
                </div>
            </div>
        
    );
};
export default Card;