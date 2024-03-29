import React, { useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/module/messages";

// STYLED COMPONENTS
const SectionTitle = styled.h1`
  font-size: 2rem;
  text-align: left;
  padding: 1rem 2.5rem;
  border-bottom: 1px solid #1f1f1f50;
`;

const InputContainer = styled.form`
  width: 100%;
`;

const InputBox = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #e3daf9;
  border-radius: 5px;
  margin: auto;
  & input,
  select {
    display: inline;
    width: 200px;
    padding: 0.5rem;
    border-radius: 5px;
    outline: none;
    border: none;
  }

  input:nth-child(2) {
    width: 215px;
  }

  span {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  p {
    text-align: right;
    width: 90px;
  }
`;

const MessageArea = styled.textarea.attrs({
  rows: "15",
  cols: "25",
  placeholder: "메세지를 입력하세요 (최대 100글자)",
  maxLength: 100,
  required: true,
})`
  width: 100%;
  overflow-y: scroll;
  padding: 0.5rem;
  border-radius: 5px;
`;

const Options = styled.option.attrs((props) => ({
  value: props.name,
}))``;

const SubmitBtn = styled.button.attrs({
  type: "submit",
})`
  width: fit-content;
  margin: auto;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #eee;
  outline: none;
  border: none;
  border-radius: 5px;
  color: black;
  transition: all 0.2s ease;
  font-weight: 600;
  &:hover {
    background-color: #1385c380;
    color: white;
  }
`;

// MAIN COMPONENT
export default function Input() {
  // REDUX_DISPATCH
  const dispatch = useDispatch();

  // STATES
  const [sendTo, setSendTo] = useState("민지");
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  // VARIABLES
  const option = ["민지", "하니", "다니엘", "혜린", "혜인"];

  // FUNCTIONS
  const handleChangeSendTo = (e) => {
    setSendTo(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const addMessage = (task) => {
    dispatch(addTask(task));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let task = {
      id: uuid(),
      sendTo,
      text,
      name,
      isEdit: false,
      createdAt: new Date(),
      avatar: "url(/assets/default-avatar.png)",
    };
    addMessage(task);
    setSendTo("민지");
    setText("");
    setName("");
  };

  // MAIN RETURN
  return (
    <>
      <SectionTitle>Letter</SectionTitle>
      <InputContainer onSubmit={HandleSubmit}>
        <InputBox>
          <span>
            <p>To : &nbsp;</p>
            <select
              onChange={handleChangeSendTo}
              value={sendTo}
              name="most"
              id="most">
              {option.map((el) => (
                <Options key={el} name={el}>
                  {el}
                </Options>
              ))}
            </select>
          </span>
          <span>
            <p>Name : &nbsp;</p>
            <input
              onChange={handleChangeName}
              value={name}
              required
              maxLength={10}
              placeholder="이름을 입력하세요 (최대 10글자)"
            />
          </span>
          <span>
            <p>Message : &nbsp;</p>
            <MessageArea onChange={handleChangeText} value={text} />
          </span>
          <SubmitBtn onSubmit={HandleSubmit}>전송하기</SubmitBtn>
        </InputBox>
      </InputContainer>
    </>
  );
}
