import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
// extra imports

import { Link } from 'react-router-dom';

const Reviews = () => {
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className='page'>
        <h1>Reviews</h1>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div``;
export default Reviews;
