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
    product: productId,
    user,
  });

  // Get all reviews
  useEffect(() => {
    getAllReviews(productId);
  }, [productId]);

  const getAllReviews = async ({ productId }) => {
    try {
      const response = await axios.get(
        'https://ecommerce-6kwa.onrender.com/api/v1/reviews',
        { withCredentials: true }
      );
      const allReviews = response.data.reviews;
      const filteredReviews = allReviews.filter((review)=> review.product._id === productId)
      console.log(filteredReviews);
      
      setReviews(filteredReviews);
    } catch (error) {
      console.error(error);
    }
  };

  const createReview = async (productId, user) => {
    try {
      const response = await axios.post(
        'https://ecommerce-6kwa.onrender.com/api/v1/reviews',
        formData,
        { withCredentials: true }
      );
      setFormData({
        rating: '',
        title: '',
        comment: '',
        product: productId,
        user: user,
      });
   
      setMessage('Review created successfully');
      getAllReviews(productId);
    } catch (error) {
      console.error(error);
      setMessage('Check all the fields');
    }
  };

  const updateReview = async (reviewId, productId) => {
    try {
      const response = await axios.patch(
        `https://ecommerce-6kwa.onrender.com/api/v1/reviews/${reviewId}`,
        formData,
        { withCredentials: true }
      );
      setFormData({
        rating: Number,
        title: '',
        comment: '',
        product: productId,
        user: user,
      });
      setMessage('Review updated successfully');
      getAllReviews(productId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
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
        
        <button onClick={createReview}>Create</button>
      </div>
      <div>
        <h3>All Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id}>
            <h3>{review.title}</h3>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            {user && (
              <>
                <button onClick={() => updateReview(review._id, productId)}>
                  Update
                </button>
                <button onClick={() => deleteReview(review._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
