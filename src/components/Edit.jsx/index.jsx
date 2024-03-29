import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../redux/module/messages";

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

const EditName = styled.h4`
  padding: 1rem;
  border-bottom: 1px solid #1f1f1f;
`;

const EditText = styled.textarea.attrs((props) => ({
  placeholder: props.$currentText,
  ref: props.ref,
  maxLength: 100,
}))`
  width: 100%;
  height: 382px;
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
export default function Edit({ setIsEdit }) {
  // Redux
  const reduxState = useSelector((state) => state.messages);

  // DISPATCH
  const dispatch = useDispatch();

  // HOOKS
  const paramId = useParams();
  const initRef = useRef("");

  // VARIABLES
  const data = reduxState?.find((el) => el.id === paramId.id);

  // STATES
  const [modal, setModal] = useState(false);
  const [edited, setEdited] = useState(data.text);

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
    if (edited.length === 0) alert("메세지를 입력하세요");
    if (edited === data.text) {
      alert("수정사항이 없습니다.");
      setIsEdit(false);
    } else {
      dispatch(editTask(data, edited));
      setIsEdit(false);
    }
  };

  // MAIN RETURN
  return (
    <EditContainer>
      <MessageEditBox>
        <EditTitle>To.&nbsp;{data.sendTo}</EditTitle>
        <EditName>Name: &nbsp;{data.name}</EditName>
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

      {modal && <Modal paramId={paramId} setModal={setModal} />}
    </EditContainer>
  );
}
