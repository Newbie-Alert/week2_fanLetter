import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "../Modal";

// STYLED COMPONENTS
const EditContainer = styled.div`
  padding-top: 12rem;
  width: 100%;
`;

const MessageEditBox = styled.div`
  width: 1200px;
  height: 500px;
  margin: auto;
  border: 1px solid #1f1f1f;
`;

const EditTitle = styled.h3`
  padding: 1rem;
  border-bottom: 1px solid #1f1f1f;
`;

const EditText = styled.textarea.attrs((props) => ({
  placeholder: props.$currentText,
  ref: props.ref,
}))`
  width: 100%;
  height: 380px;
  overflow-y: scroll;
  padding: 1rem;
  border: none;
  outline: none;
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
export default function Edit({ messages, setMessages, setIsEdit }) {
  // VARIABLES
  const data = messages?.find((el) => el.id === paramId.id);

  // STATES
  const [modal, setModal] = useState(false);
  const [edited, setEdited] = useState(data.text);

  // HOOKS
  const paramId = useParams();
  const initRef = useRef("");

  // USE EFFECT
  useEffect(() => {
    initRef.current.focus();
  }, []);

  // FUNCTIONS
  const cancleEdit = () => {
    setIsEdit(false);
  };

  const handleChangeEdited = (e) => {
    setEdited(e.target.value);
  };

  const editMessage = () => {
    data.text = edited;
    setIsEdit(false);
  };

  // MAIN RETURN
  return (
    <EditContainer>
      <MessageEditBox>
        <EditTitle>To.&nbsp;{data.sendTo}</EditTitle>
        <EditText
          onChange={(e) => handleChangeEdited(e)}
          value={edited}
          ref={initRef}
          $currentText={data.text}></EditText>
        <ButtonBox>
          <Button onClick={cancleEdit} role="delete">
            취소
          </Button>
          <Button onClick={editMessage} role="edit">
            확인
          </Button>
        </ButtonBox>
      </MessageEditBox>

      {modal && (
        <Modal
          paramId={paramId}
          setModal={setModal}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </EditContainer>
  );
}
