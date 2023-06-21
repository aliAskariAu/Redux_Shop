import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
      <Wrapper className='page section section-center'>
        <PageHero title='about' />
        <section>
          <div className='title'></div>
          <img src={aboutImg} alt="about image"/>
          <h2>Our Story</h2>
          <div className="underline"></div>
        </section>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At eaque,
          exercitationem libero non officia omnis pariatur quisquam tempore vel voluptatibus!
          Accusantium aspernatur aut debitis doloremque error in magnam, pariatur reiciendis?</p>
      </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
