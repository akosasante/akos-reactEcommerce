import React, { useState } from 'react';
import axios from 'axios';

const DeleteProduct = ({ productId, onDelete }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://ecommerce-6kwa.onrender.com/api/v1/products/${productId}`,
        { withCredentials: true }
      );
      console.log('Product deleted successfully:', response.data);
      setMessage('Product deleted successfully');
      onDelete(); // Callback to notify the parent component about the deletion
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <button onClick={handleDelete}>Delete Product</button>
      <p>
        <b>
          <em>{message}</em>
        </b>
      </p>
    </div>
  );
};

export default DeleteProduct;
