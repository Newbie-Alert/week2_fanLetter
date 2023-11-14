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

const CompFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  25% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.5;
  }

  75% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const SkeletonBox = styled.div`
  width: 300px;
  height: fit-content;
  padding: 1rem;
  background-color: #1f1f1f;
  border-radius: 5px;
  animation: ${pulseAni} 3s ease infinite;
  animation: ${CompFade} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  position: relative;
`;

const SkeletonTitle = styled.div`
  width: 100px;
  height: 50px;
  background-color: silver;
  margin-bottom: 1rem;
  animation: ${pulseAni} 2s ease infinite;
`;

const SkeletonText = styled.h2`
  position: absolute;
  top: 15%;
  right: 15%;
  color: white;
  z-index: 1;
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
  const lineArr = Array(3);
  return (
    <SkeletonBox>
      <SkeletonTitle />
      <PragraphContainer>
        {[...lineArr].map((el, i) => {
          return <SkeletonParagraph key={i} />;
        })}
      </PragraphContainer>
      <SkeletonText>No Data</SkeletonText>
    </SkeletonBox>
  );
}
