import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteTask } from "../../redux/module/messages";

// STYLED COMPONENT
const ModalContainer = styled.div`
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  border: 1px solid #1f1f1f;
  border-radius: 9px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ConfirmButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  &:hover {
    background-color: ${(props) =>
      props.$role === "delete" ? `red` : `green`};
    color: white;
  }
`;

// MAIN COMPONENT
export default function Modal({ paramId, setModal }) {
  // REDUX_DISPATCH
  const dispatch = useDispatch();

  // HOOKS
  const navi = useNavigate();

  // FUNCTIONS
  const closeModal = () => {
    setModal(false);
  };

  const deleteMessage = (id) => {
    dispatch(deleteTask(id));
    navi("/");
  };

  // MAIN RETURN
  return (
    <ModalContainer>
      <h4>메세지를 삭제하시겠습니까?</h4>
      <ConfirmButtonBox>
        <Button
          id={paramId.id}
          onClick={(e) => {
            deleteMessage(e.target.id);
          }}
          $role="delete">
          삭제
        </Button>
        <Button onClick={closeModal} $rore="edit">
          취소
        </Button>
      </ConfirmButtonBox>
    </ModalContainer>
  );
}
