import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = ({ productId }) => {
  // Fetch current user
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          'https://ecommerce-6kwa.onrender.com/api/v1/users/showMe',
          { withCredentials: true }
        );
        setCurrentUser(response?.data?.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);

  const user = currentUser;
  //console.log(user.userId); //user id

  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    rating: '',
    title: '',
    comment: '',
    product: productId
  });

  // Get all reviews
  useEffect(() => {
    getAllReviews(productId);
  }, [productId]);

  const getAllReviews = async (productId) => {
    try {
      const response = await axios.get(
        'https://ecommerce-6kwa.onrender.com/api/v1/reviews',
        { withCredentials: true }
      );
      const allReviews = response.data.reviews;
      const filteredReviews = allReviews.filter((review)=> review?.product?._id === productId)

      setReviews(filteredReviews);
      console.log('this is the result', filteredReviews);
    } catch (error) {
      console.error(error);
    }
  };

  const createReview = async (productId) => {
    try {
      await axios.post(
        'https://ecommerce-6kwa.onrender.com/api/v1/reviews',
        formData,
        { withCredentials: true }
      );
      setFormData({
        rating: '',
        title: '',
        comment: '',
        product: productId,
      });

      setMessage('Review created successfully');
      await getAllReviews(productId);
    } catch (error) {
      console.error(error);
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setMessage(error.response.data.msg)
      } else {
        setMessage('Check all the fields');
      }
    }
  };

  const updateReview = async (reviewId, productId) => {
    try {
      await axios.patch(
        `https://ecommerce-6kwa.onrender.com/api/v1/reviews/${reviewId}`,
        formData,
        { withCredentials: true }
      );
      setFormData({
        rating: Number,
        title: '',
        comment: '',
        product: productId,
      });
      setMessage('Review updated successfully');
      getAllReviews(productId);
    } catch (error) {
      console.error(error);
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setMessage(error.response.data.msg)
      } else {
        setMessage('Could not update review - Check all the fields');
      }
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `https://ecommerce-6kwa.onrender.com/api/v1/reviews/${reviewId}`,
        { withCredentials: true }
      );
      setMessage('Review deleted successfully');
      getAllReviews(productId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <p style={{ color: 'red', textAlign: 'center' }}>
          <b>
            <em>{message}</em>
          </b>
        </p>
        <h3>Create Review</h3>
        <p>
          <em>Max. one review per product</em>
        </p>
        <label htmlFor="product">Product:</label>
        <div>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleInputChange}
        /></div>
        <label htmlFor="rating">Rating:</label>
        <div>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={formData.rating}
          onChange={handleInputChange}
        /></div>
        <label htmlFor="title">Title:</label>
        <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        /></div>
        <label htmlFor="comment">Comment:</label>
        <div>
        <input
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
        /></div>

        <button className='create' onClick={() => createReview(productId)}>Create review</button>
      </div>
      <div>
        <h5> Read all the reviews about this product:</h5>
        {reviews.map((review) => (
          <div key={review._id}>
            <h6>{review.title}</h6>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>

            {user && (review.user === user.userId) && (
              <>
                <button className='change' onClick={() => updateReview(review._id, productId)}>
                  Update my review
                </button>
                <div>
                 <button className='delete' onClick={() => deleteReview(review._id)}>Delete my review</button> 
                </div>
                
                
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
