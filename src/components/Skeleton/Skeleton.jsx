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
  width: 300px;
  height: fit-content;
  padding: 1rem;
  background-color: #1f1f1f;
  border-radius: 5px;
  animation: ${pulseAni} 3s ease infinite;
  margin-block: 2rem;
  margin-left: 2.2rem;
`;

const SkeletonTitle = styled.div`
  width: 100px;
  height: 50px;
  background-color: silver;
  margin-bottom: 1rem;
  animation: ${pulseAni} 2s ease infinite;
`;

const PragraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SkeletonParagraph = styled.div`
  width: 100%;
  height: 15px;
  background-color: silver;
  animation: ${pulseAni} 2s ease infinite;
`;

export default function Skeleton() {
  return (
    <SkeletonBox>
      <SkeletonTitle />
      <PragraphContainer>
        <SkeletonParagraph />
        <SkeletonParagraph />
        <SkeletonParagraph />
      </PragraphContainer>
    </SkeletonBox>
  );
}
