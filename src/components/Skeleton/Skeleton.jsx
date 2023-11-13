import React from "react";
import styled, { keyframes } from "styled-components";

const pulseAni = keyframes`
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;

const SkeletonBox = styled.div`
  height: fit-content;
  padding: 1rem;
  background-color: #1f1f1f;
  border-radius: 5px;
  animation: ${pulseAni} 2s ease infinite;
`;

const SkeletonTitle = styled.div`
  width: 100%;
  height: 50px;
  background-color: silver;
  animation: ${pulseAni} 2s ease infinite;
`;

const SkeletonParagraph = styled.div`
  width: 100%;
  background-color: silver;
  animation: ${pulseAni} 2s ease infinite;
`;

export default function Skeleton() {
  return (
    <SkeletonBox>
      <SkeletonTitle />
      <SkeletonParagraph />
    </SkeletonBox>
  );
}
