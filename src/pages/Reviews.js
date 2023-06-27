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

  const getAllReviews = async ({productId}) => {
    try {
      const response = await axios.get(
        'https://ecommerce-6kwa.onrender.com/api/v1/reviews',
        { withCredentials: true }
      );
      setReviews(response.data.reviews);
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
      getAllReviews(productId);
    } catch (error) {
      console.error(error);
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
      });
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
      <h2>Reviews</h2>
      <div>
        <h3>Create Review</h3>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
        />
        <label htmlFor="product">Product:</label>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleInputChange}
        />
        <button onClick={createReview}>Create</button>
      </div>
      <div>
        <h3>All Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id}>
            <h3>{review.title}</h3>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <button onClick={() => updateReview(review._id)}>Update</button>
            <button onClick={() => deleteReview(review._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
