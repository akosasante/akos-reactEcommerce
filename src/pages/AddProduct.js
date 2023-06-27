import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');

  const [featured, setFeatured] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [inventory, setInventory] = useState(15);
  const [message, setMessage] = useState(''); //message 'product'added'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // instantiate a 'form-data' object in the browser to upload the image file
    formData.set('image', image);
    const imageResponse = await axios.post(
      'https://ecommerce-6kwa.onrender.com/api/v1/products/uploadImage',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.dir(imageResponse);

    const product = {
      name,
      price,
      description,
      image: imageResponse.data.image,
      category,
      company,

      featured,
      freeShipping,
      inventory,
    };

    try {
      const response = await axios.post(
        'https://ecommerce-6kwa.onrender.com/api/v1/products',
        product,
        { withCredentials: true }
      );
      console.log('Product added successfully:', response.data);
      setMessage(`Product added successfully`);

      // Reset form fields
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('');
      setCompany('');
      setFeatured(false);
      setFreeShipping(false);
      setInventory(15);
    } catch (error) {
      console.log('Error adding product:', error);
    }
  };

  return (
    <div className="center">
      <div>
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name </label>
            <div>
              <input
                className="inputbox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Price </label>
            <div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Description </label>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <label>Image </label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div>
            <label>Category </label>
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
            <label>Company </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Select Company</option>
              <option value="Suarez">Suarez</option>
              <option value="Tiffany">Tiffany</option>
              <option value="Cartier">Cartier</option>
            </select>
          </div>

          <div>
            <label>Featured </label>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
          </div>
          <div>
            <label>Free Shipping </label>
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
            />
          </div>
          <div>
            <label>Inventory </label>
            <div>
              <input
                type="number"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
              />
            </div>
          </div>

          {/* <button type="submit">Add Product</button> */}
          <button type="submit" className="crudbtn">
            <span>Add Product</span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                stroke-width="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </button>
          <p>
            <b>
              <em> {message}</em>
            </b>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
