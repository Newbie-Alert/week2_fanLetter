import React from "react";
import styled from "styled-components";
import List from "../List";

// STYLED COMPONENTS
const MessageCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// MAIN COMPONENT
export default function Card({ messages }) {
  // MAIN RETURN
  return (
    <MessageCardContainer>
      <List messages={messages} />
    </MessageCardContainer>
  );
}
