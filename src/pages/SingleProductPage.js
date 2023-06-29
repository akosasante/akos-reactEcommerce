import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import Reviews from './Reviews';

const rootUrl = 'https://ecommerce-6kwa.onrender.com';


const SingleProductPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const url = `${rootUrl}/api/v1/users/showMe`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          console.log(response);

          // if (response && response.data && response.data.user) {
          //   return response.data.user;
          // }

          setCurrentUser(response?.data?.user);
        })
        .catch((error) => {
          const errorPayload =
            error instanceof AxiosError ? error?.response?.data : error;
          console.error(errorPayload);
        });
    }
    fetchData();
    // By using empty array [], for the "dependencies" argument of useEffect, it tells React to run this useEffect hook only *once*, the first time this component/context is rendered
  }, []);
  const isAdminLoggedIn = currentUser?.role === 'admin';

  const { id } = useParams();

  console.log(id);
  //const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  //but i still cant fetch single product
  useEffect(() => {
    fetchSingleProduct(url, id);
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  console.log(product);

  const {
    name,
    price,
    description,
    inventory,
    averageRating,
    numOfReviews,
    id: sku,
    company,
    image,
  } = product;
  return (
    <Wrapper>
      <PageHero title={name} product />

      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>

        <div className="product-center">
          <ProductImages image={image} />

          <section className="content">
            <h2>{name}</h2>

            <Stars stars={averageRating} reviews={numOfReviews} id={id} />

            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>

            <p className="info">
              <span>Available : </span>
              {inventory > 0 ? 'In stock' : 'out of stock'}
            </p>

            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>

            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            
            <hr />
            {inventory > 0 && <AddToCart product={product} />}
            
          </section>
          <div>
            {isAdminLoggedIn && <UpdateProduct productId={id}/>}
         
            {isAdminLoggedIn && <DeleteProduct productId={id}/>}
            </div>
<Reviews productId ={id}/>
        </div>

      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
