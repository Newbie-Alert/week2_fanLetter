import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton/Skeleton";

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
  height: 370px;
  padding: 1rem 2.5rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  overflow-y: scroll;
  animation: ${CompFade} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ListContainer = styled.div`
  height: 150px;
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    gap: 1rem;
  }
`;

const MessageBox = styled.div`
  width: 100%;
  height: 40px;
  border-top: 1px solid #1f1f1f50;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  @media screen and (max-width: 768px) {
    width: 150px;
  }
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
    background-color: #1369b5;
    color: white;
  }
`;

// MAIN COMPONENT
export default function List() {
  // ReduxState
  const reduxMessages = useSelector((state) => state.messages);

  // STATE
  const [member, setMember] = useState("전체");
  const [color, setColor] = useState(false);

  // Variables
  const members = ["전체", "민지", "하니", "다니엘", "혜린", "혜인"];
  const filtered =
    member === "전체"
      ? reduxMessages
      : reduxMessages.filter((el) => el.sendTo === member);

  // FUCNTIONS
  const filterMember = (memberName) => setMember(memberName);

  const returnDetailUrl = (id) => `/message/${id}`;

  const changeBg = () => {
    setColor(true);
  };

  // HOOKS
  const navi = useNavigate();

  return (
    <>
      <ListSectionTitle>
        Messages
        <FilterBtnContainer>
          {members.map((el, i) => (
            <FilterBtn
              $bg={color ? "skyblue" : "white"}
              key={i}
              onClick={(e) => {
                changeBg(e);
                filterMember(el);
              }}>
              {el}
            </FilterBtn>
          ))}
        </FilterBtnContainer>
      </ListSectionTitle>

      <MessageContainer>
        {filtered?.length === 0 ? (
          <Skeleton />
        ) : (
          filtered?.map((message) => {
            return (
              <ListContainer
                onClick={() => navi(`${returnDetailUrl(message.id)}`)}
                key={message.id}>
                <h4>To.&nbsp;{message.sendTo}</h4>
                <h6>{message.createdAt.toString().slice(0, 15)}</h6>
                <MessageBox>
                  <p>{message.text}</p>
                </MessageBox>
              </ListContainer>
            );
          })
        )}
      </MessageContainer>
    </>
  );
}
