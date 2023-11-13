import React, { useEffect } from "react";
import styled from "styled-components";

// STYLED COMPONENTS
const BannerContainer = styled.div`
  width: 100%;
  height: 650px;
  position: relative;
`;

const BannerImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url('assets/${props.$randomBack}')`};
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  filter: opacity(0.7);
`;

const Title = styled.h1`
  position: absolute;
  bottom: 2%;
  left: 2%;
  z-index: 1;
  font-size: 3rem;
  opacity: 0.9;
  color: #1b1b1b;
  letter-spacing: -0.08rem;
`;

// MAIN COMPONENT
export default function Banner() {
  // VARIABLES
  const randomImg = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

  // FUNCTIONS
  const returnRandomImg = () => {
    return randomImg[Math.floor(Math.random() * randomImg.length)];
  };

  // USE EFFECT
  useEffect(() => {
    returnRandomImg();
  }, []);

  // MAIN RETURN
  return (
    <BannerContainer>
      <Title>NewJeans</Title>
      <BannerImg $randomBack={returnRandomImg()}></BannerImg>
    </BannerContainer>
  );
}
