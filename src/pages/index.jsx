import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Modal from "../components/Modal/index.jsx";
import Edit from "../components/Edit.jsx/index.jsx";
import { MessageContextData } from "../Context/MessageContext.jsx";

// STYLED COMPONENTS
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

const DetailContainer = styled.div`
  padding-top: 12rem;
  width: 100%;
  animation: ${CompFade} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

const MessageDetailBox = styled.div`
  width: 1200px;
  height: 500px;
  margin: auto;
  border: 1px solid #1f1f1f;
`;

const DetailTitle = styled.h3`
  padding: 1rem;
  border-bottom: 1px solid #1f1f1f;
`;

const DetailText = styled.div`
  width: 100%;
  height: 380px;
  overflow-y: scroll;
  padding: 1rem;
`;

const ButtonBox = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #1f1f1f;
`;

const Button = styled.button`
  &:hover {
    background-color: ${(props) => (props.role === "delete" ? `red` : `green`)};
    color: white;
  }
`;

// MAIN COMPONENT
export default function Detail() {
  // HOOKS
  const paramId = useParams();

  // CONTEXT
  const { messages, setMessages } = useContext(MessageContextData);

  // STATES
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // VARIABLES
  const data = messages?.find((el) => el.id === paramId.id);

  // FUNCTIONS
  const openModal = () => {
    setModal(true);
  };

  const openEdit = () => {
    setIsEdit(true);
  };

  // MAIN RETURN
  if (isEdit === true)
    return (
      <Edit
        messages={messages}
        setMessages={setMessages}
        setIsEdit={setIsEdit}
      />
    );
  return (
    <>
      <DetailContainer>
        <MessageDetailBox>
          <DetailTitle>To.&nbsp;{data.sendTo}</DetailTitle>
          <DetailText>{data.text}</DetailText>
          <ButtonBox>
            <Button onClick={openModal} role="delete">
              삭제
            </Button>
            <Button onClick={openEdit} role="edit">
              수정
            </Button>
          </ButtonBox>
        </MessageDetailBox>
      </DetailContainer>
      {modal && <Modal paramId={paramId} setModal={setModal} />}
    </>
  );
}
