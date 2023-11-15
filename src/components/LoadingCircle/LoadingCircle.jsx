import React from "react";
import styled, { keyframes } from "styled-components";

// STYLED COMPONENTS
const CircleAni = keyframes`
  to {
    transform: rotate(0deg);
  }

  from {
    transform: rotate(360deg);
  }
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: transparent;
  border-radius: 50%;
  z-index: 3;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-left-color: 3px solid #1f1f1f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectorOne = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-top-color: #2024a4;
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 0%;
  opacity: 0.7;
  animation: ${CircleAni} 3.5s infinite 2s forwards;
`;

const SectorTwo = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-right-color: red;
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 0%;
  opacity: 0.2;
  animation: ${CircleAni} 2s infinite 2s forwards;
`;

const SectorThree = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-bottom-color: #00ff62;
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 0%;
  opacity: 0.3;
  animation: ${CircleAni} 1.5s infinite forwards;
`;

// MAIN COMPONENT
export default function LoadingCircle() {
  return (
    <Circle>
      Loading
      <SectorOne></SectorOne>
      <SectorTwo></SectorTwo>
      <SectorThree></SectorThree>
    </Circle>
  );
}
