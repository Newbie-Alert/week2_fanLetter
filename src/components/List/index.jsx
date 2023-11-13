import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

// STYLED COMPONENT
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

const MessageContainer = styled.div`
  width: 100%;
  height: 421px;
  padding: 1rem 2.5rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  overflow-y: scroll;
`;

const ListContainer = styled.div`
  height: 150px;
  padding: 1rem;
  border: 1px solid #1f1f1f50;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  animation: ${CompFade} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  transition: all 0.1s ease;
  &:hover {
    background-color: #eadcff50;
    color: black;
    p {
      text-decoration: underline;
    }
  }
`;

const ListSectionTitle = styled.h1`
  text-align: left;
  padding: 1rem 2.5rem;
  border-bottom: 1px solid #1f1f1f50;
`;

const MessageBox = styled.div`
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

// MAIN COMPONENT
export default function List() {
  // ReduxState
  const reduxMessages = useSelector((state) => state.messages);
  console.log(reduxMessages);

  // HOOKS
  const navi = useNavigate();
  const returnDetailUrl = (id) => `/message/${id}`;

  // MAIN RETURN
  return (
    <>
      <ListSectionTitle>Messages</ListSectionTitle>
      <MessageContainer>
        {reduxMessages?.map((message) => {
          return (
            <ListContainer
              onClick={() => navi(`${returnDetailUrl(message.id)}`)}
              key={message.id}>
              <h4>To.&nbsp;{message.sendTo}</h4>
              <MessageBox>
                <p>{message.text}</p>
              </MessageBox>
            </ListContainer>
          );
        })}
      </MessageContainer>
    </>
  );
}
