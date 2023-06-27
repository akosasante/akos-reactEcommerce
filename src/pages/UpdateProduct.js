import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProduct = ({ productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [featured, setFeatured] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [inventory, setInventory] = useState(15);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-6kwa.onrender.com/api/v1/products/${productId}`,
          { withCredentials: true }
        );
        const product = response.data;
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      description,
      category,
      company,
      featured,
      freeShipping,
      inventory,
    };

    try {
      const response = await axios.patch(
        `https://ecommerce-6kwa.onrender.com/api/v1/products/${productId}`,
        product,
        { withCredentials: true }
      );
      console.log('Product updated successfully:', response.data);
      setMessage('Product updated successfully');
    } catch (error) {
      console.log('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="necklace">necklace</option>
            <option value="ring">ring</option>
            <option value="earrings">earrings</option>
          </select>
        </div>
        <div>
          <label>Company</label>
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="">Select Company</option>
            <option value="Suarez">Suarez</option>
            <option value="Tiffany">Tiffany</option>
            <option value="Cartier">Cartier</option>
          </select>
        </div>
        <div>
          <label>Featured</label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </div>
        <div>
          <label>Free Shipping</label>
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
          />
        </div>
        <div>
          <label>Inventory</label>
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update Product
        </button>
      </form>
      <p>
        <b>
          <em>{message}</em>
        </b>
      </p>
    </div>
  );
};

export default UpdateProduct;
