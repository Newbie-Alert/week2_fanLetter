import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

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
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  overflow-y: scroll;
`;

const ListContainer = styled.div`
  height: 200px;
  padding: 1rem;
  border: 1px solid #1f1f1f50;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
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
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

const MessageBox = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  height: 35px;
  border-top: 1px solid #1f1f1f50;
  word-wrap: break-word;
  text-overflow: ellipsis;
  letter-spacing: 0.02rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const FilterBtnContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding-top: 0.5rem;
`;

const FilterBtn = styled.button`
  &:focus {
    background-color: ${(props) => props.$bg};
  }
  &:hover {
    background-color: #0c3a6e;
    color: white;
  }
`;

const NoData = styled.h3`
  width: 300px;
  animation: ${CompFade} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

// MAIN COMPONENT
export default function List({ messages }) {
  // HOOKS
  const navi = useNavigate();

  // STATES
  const [member, setMember] = useState("전체");
  const [color, setColor] = useState(false);

  // VARIABLES
  const members = ["전체", "민지", "하니", "다니엘", "혜린", "혜인"];
  const filtered =
    member === "전체"
      ? messages
      : messages.filter((el) => el.sendTo === member);

  // FUCNTIONS
  const filterMember = (memberName) => {
    setMember(memberName);
  };

  const returnDetailUrl = (id) => `/message/${id}`;

  const changeColor = () => setColor(true);

  // MAIN RETURN
  return (
    <>
      <ListSectionTitle>
        Messages
        <FilterBtnContainer>
          {members.map((el, i) => (
            <FilterBtn
              key={i}
              $bg={color ? "skyblue" : "white"}
              onClick={() => {
                filterMember(el);
                changeColor();
              }}>
              {el}
            </FilterBtn>
          ))}
        </FilterBtnContainer>
      </ListSectionTitle>
      <MessageContainer>
        {filtered.length === 0 && (
          <NoData>{member}에게 메세지가 없습니다🥲</NoData>
        )}
        {filtered?.map((message) => {
          return (
            <ListContainer
              onClick={() => navi(`${returnDetailUrl(message.id)}`)}
              key={message.id}>
              <h5>To.&nbsp;{message.sendTo}</h5>
              <h3>{message.name}</h3>
              <h6>{message.createdAt.toString().slice(0, 15)}</h6>
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
