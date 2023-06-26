import React, { useState } from 'react';
import axios from 'axios';


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
    <div>
      <h2>Add Product</h2>
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
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

        <button type="submit">Add Product</button>
        <p>
          <b>
            <em> {message}</em>
          </b>
        </p>
      </form>
    </div>
  );
};

export default AddProduct;
