import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// STYLED COMPONENTS
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  padding: 0.85rem 3.6rem;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: ${(props) => `translateY(${props.$headerPosition}%)`};
  transition: transform 0.3s cubic-bezier(0.245, 0.05, 0.15, 0.95);
`;

const Logo = styled.h2`
  width: 50px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  width: 250px;
  padding: 0 1rem;
`;

const SearchInput = styled.input.attrs({
  required: true,
  placeholder: "내 최애를 찾아보세요!",
})`
  width: 100%;
  padding: 0.6rem 0.46rem;
  padding-left: 0.6rem;
  border-radius: 9px;
  outline: none;
  border: none;
`;

// MAIN COMPONENT
export default function Header() {
  // HOOKS
  const navi = useNavigate();
  const toHome = () => navi("/");

  // State
  const [headerPosition, setHeaderPosition] = useState(0);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      setHeaderPosition(-100);
    } else {
      setHeaderPosition(0);
    }
  });

  // MAIN RETURN
  return (
    <HeaderContainer $headerPosition={headerPosition}>
      <Logo onClick={toHome}>로고</Logo>
      <SearchContainer>
        <SearchInput />
      </SearchContainer>
    </HeaderContainer>
  );
}
