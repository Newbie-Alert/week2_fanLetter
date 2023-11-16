<br/>

# 프로젝트 목적 및 기능

## 프로젝트 목적

- 좀 더 나은 디렉토리 구조를 설계하는 것을 학습
- **props**, **Context API**, **Redux**를 활용한 `State 관리` 학습
- **React-router-dom**을 활용한 `SPA의 page 관리` 학습
- **styled-component**를 이용한 `컴포넌트와 style 관리`, `컴포넌트 재사용성 향상` 학습
- 기본적인 `CRUD 구현`

## 프로젝트 주요 기능

- 데이터 `등록 / 조회 / 수정 / 삭제`
- router로 페이지 이동
- 전역 state 관리
- `조건부 렌더링`을 통한 `filter 기능`

## 전역 State 관리 체험 후기

### 1. props 전달 방식

```js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import { useState } from "react";
import App from "../App";
import Detail from "../pages";
import Header from "../components/Header";

const Router = () => {
  // STATES
  const [messages, setMessages] = useState([]);
  // MAIN RETURN
  return (
    <BrowserRouter>
      <Header />
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<App messages={messages} setMessages={setMessages} />}
        />
        <Route
          path="/message/:id"
          element={<Detail messages={messages} setMessages={setMessages} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
```

- `최상위 요소 Router에서 전역 상태를 생성` 후  
  하위 컴포넌트로 props를 전달

### 장점

- `Redux`나 `Context API` 같은 보일러 플레이트가 없어서 빠른 작업이 가능
- 하위 컴포넌트가 `많이 없을 경우` state 공유가 편리

### 단점

- 만약 props를 `깊은 자식 컴포넌트로 전달할 경우`  
  중간에 불필요한 컴포넌트를 거쳐야 해서 번거롭다.
- prop_drilling이 뭔지 경험하게 됐다.
- props `전달이 많을 수록 state 관리가 어려워졌다.`

<br/>

### 2. Context API 전달 방식

```js
<context.jsx>

import React, { createContext, useState } from "react";

export const MessageContextData = createContext();

export default function MessageContext({ children }) {
  const [messages, setMessages] = useState([]);

  return (
    <MessageContextData.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContextData.Provider>
  );
}
```

```js
<Router.js>

const Router = () => {
  // MAIN RETURN
  return (
    <BrowserRouter>
      <Header />
      <GlobalStyle />
      <MessageContext>
        <Routes>
          <Route path="/" element={<App />} /> // Context 적용
          <Route path="/message/:id" element={<Detail />} /> // Context 적용
        </Routes>
      </MessageContext>
    </BrowserRouter>
  )
}
```

- context.jsx 에서 전역 state를 생성 후  
  해당 컴포넌트의 자식 요소들에게 state를 공유함.

### 장점

- `필요한 컴포넌트에서만 state를 가져다 사용`할 수 있어서 편리했다.

### 단점

- `준비 단계`가 있어서 조금 `번거로웠다`.
- state를 업데이트 할 때 작업한 곳에 가서 변경해야 해서 번거로움이 조금 있었다.
- `쓰이는 곳이 많아질수록` props를 사용하는 것보다는 덜하지만 뭔가 `복잡함이 있었다`.

<br/>

### 3. Redux로 전역 state 관리

- `Ducks 패턴으로 작성`하여 `state 관리를 한 곳에서 처리`

```js
<context.jsx>

import React, { createContext, useState } from "react";

export const MessageContextData = createContext();

export default function MessageContext({ children }) {
  const [messages, setMessages] = useState([]);

  return (
    <MessageContextData.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContextData.Provider>
  );
}
```

```js
<configStore.js>

import { combineReducers, legacy_createStore as createStore } from "redux"
import messages from "../module/messages";

// COMBINED REDUCER
const rootReducer = combineReducers({
  messages
})

// STORE
export const store = createStore(rootReducer);
```

<br/>

```js
// ACTION VALUE
const ADD_MSG = "ADD_MSG";
const DELETE_MSG = "DELETE_MSG";
const EDIT_MSG = "EDIT_MSG";

// ACTION VALUE CREATOR
export const addTask = (msg) => {
  return { type: ADD_MSG, payload: msg };
};

export const deleteTask = (target) => {
  return { type: DELETE_MSG, payload: target };
};

export const editTask = (target, text) => {
  return { type: EDIT_MSG, payload: text, target };
};

// initValue
const initialValue = [];

// reducer
const messages = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_MSG:
      return (state = [action.payload, ...state]);
    case DELETE_MSG:
      return (state = state.filter((msg) => msg.id !== action.payload));
    case EDIT_MSG:
      let found = state.find((el) => el.id === action.target.id);
      found.text = action.payload;
      return state;
    default:
      return state;
  }
};

export default messages;
```

- moudle에 전역 state, state 변경함수 (reducer)를 생성 후
  state를 공유함.

### 장점

- 필요한 컴포넌트에서만 state를 가져다 사용할 수 있어서 편리했다.
- `state를 한 곳에서 관리`할 수 있어 좋았다

### 단점

- `준비 단계`가 손에 안 익어서 `조금 번거로웠다`.

<br/>

## 주요 기능 (prop_drilling 기준 코드)

### **데이터 생성**

- input, textarea에서 `onChange 이벤트가 발생 시`  
  name,text,sendTo의 값을 `state에 업데이트` 하고

```js
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
        onChange={(e) => handleChangeName(e)}
        value={name}
        type="text"
        maxLength={8}
        required
        placeholder="이름을 입력하세요 (최대 8글자)"
      />
    </span>
    <span>
      <p>Message : &nbsp;</p>

      <MessageArea onChange={handleChangeText} value={text} />
    </span>
    <SubmitBtn onSubmit={HandleSubmit}>전송하기</SubmitBtn>
  </InputBox>
</InputContainer>
```

- `submit 이벤트 발생 시` 업데이트 된 `state(name, text, sendTo)를 객체에 담아  
데이터에 추가`해줬습니다.

```js
const addMessage = (task) => {
  setMessages((prev) => [task, ...prev]);
};

const HandleSubmit = (e) => {
  e.preventDefault();
  let task = {
    id: uuid(),
    sendTo,
    name,
    text,
    isEdit: false,
    createdAt: new Date(),
  };
  addMessage(task);
  setSendTo("민지");
  setText(""); // input 초기화
  setName(""); // input 초기화
};
```

<br/>

### **데이터 조회**

- `state에 담긴 데이터 배열로 UI를 생성`하여
  `데이터를 조회` 할 수 있게 하였다.
- `조건부 렌더링`을 통해 `데이터가 없을 때 다른 UI를 보여주고`  
  데이터를 `특정 조건에 따라 filter하여 조회`할 수 있도록 하였다.
- `데이터 카드를 선택 시` `useNavigate Hook`을 통해 `클릭 된  
카드의 데이터 id를 url 파라미터에 담아` 보낸다.

```js
const returnDetailUrl = (id) => `/message/${id}`;

<MessageContainer>
  {filtered.length === 0 && <NoData>{member}에게 메세지가 없습니다🥲</NoData>}
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
</MessageContainer>;
```

### **데이터 수정**

- 수정하기 위해서 상세페이지로 넘어오는데
  `수정하려는 데이터의 id를 url 파라미터로 가져온다`. (예. /detail/`데이터id`)
- 디테일 페이지에 와서 `url파라미터 값과 일치하는 데이터를 찾아 디테일 페이지에 렌더`.

```js
// MAIN COMPONENT
export default function Detail({ messages, setMessages }) {
  // HOOKS
  const paramId = useParams();

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
          <DetailName>Name: &nbsp;{data.name}</DetailName>
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

        {modal && (
          <Modal
            paramId={paramId}
            setModal={setModal}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </DetailContainer>
    </>
  );
```

- 수정 버튼을 눌러 `Edit 컴포넌트로 전환`되면 `useRef`를 통해  
  `textarea에 포커스 되도록` 설정.
- 수정 사항이 없을 시 alert을 띄우고  
  수정 사항이 있을 시 state변경 함수를 통해 해당 데이터를 업데이트.

```js
export default function Edit({ messages, setMessages, setIsEdit }) {
  // HOOKS
  const paramId = useParams();
  const initRef = useRef("");

  // VARIABLES
  const data = messages?.find((el) => el.id === paramId.id);

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
      alert("수정사항이 없습니다");
      setIsEdit(false);
    } else {
      data.text = edited;
      setIsEdit(false);
    }
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
```

<br/>

### **데이터 삭제**

- 데이터 삭제는 Modal 컴포넌트에서 담당.
- 삭제 버튼을 클릭 시 Modal 창이 뜨고  
  Modal에서 삭제 버튼을 한번 더 클릭하면
  state 변경 함수를 통해 삭제 할 데이터의 id와 같은 것을 걸러내고  
  state에 업데이트

```js
// MAIN COMPONENT
export default function Modal({ paramId, setModal, messages, setMessages }) {
  // HOOKS
  const navi = useNavigate();

  // FUNCTIONS
  const closeModal = () => {
    setModal(false);
  };

  const deleteMessage = (id) => {
    let filtered = messages.filter((el) => el.id !== id);
    setMessages(filtered);
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
```

## router 사용

- Router.js 를 만들어 각 경로마다 보여질 페이지를 설정 후
  index.js에 배치
- detail페이지로 넘어가는 path에는 `/:id` 로 `url파라미터`를 전달하도록 설정.

```js
<Router.js>

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import { useState } from "react";
import App from "../App";
import Detail from "../pages";
import Header from "../components/Header";

const Router = () => {
  // STATES
  const [messages, setMessages] = useState([]);
  // MAIN RETURN
  return (
    <BrowserRouter>
      <Header />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App messages={messages} setMessages={setMessages} />} />
        <Route path="/message/:id" element={<Detail messages={messages} setMessages={setMessages} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router


<index.js>

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router/Router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

```
1. styled-components 는 CSS in JS 라이브러리 중 하나로 리액트 개발 시 자주 사용되는 방법입니다.
   본인이 생각하는 styled-components의 장점과 단점을 말씀해 주세요.
   - 장점
     - 재사용성이 높다.
     - props를 사용하여 조건부 렌더링을 할 수 있다.
     - style의 관리가 편하다.
    
   - 단점
     - 코드가 조금 지저분해지는 느낌이다.

  
3. props-drilling으로 전체를 먼저 구현하신 다음 context api와 redux로 리팩터링해서 전역 상태 관리를 경험해 보셨습니다.
   어떤 상태들을 전역 상태로 관리하셨나요? context나 redux로 전역상태를 관리해봤을 때 어떤 문제를 해결해준다고 느끼셨나요?
   - 제일 메인으로 사용되는 message state를 전역으로 관리했습니다.
     
   - 어떤 문제를 해결해주는가
     - 컴포넌트를 분리할 때의 제약도 많이 줄어드는 거 같고
     - 불필요한 props 전달을 없애줬습니다.
     - 개인적으로는 state를 사용하는 하위 컴포넌트들이 많으면
       순간 내가 뭘 짜고 있었더라 어디서 가져와야 되더라 하고
       흐름이 끊기는 때가 있었는데
       Context, redux를 사용하면서 그런 경험이 줄었습니다.
     - redux의 경우 한 곳에서 state를 관리할 수 있어서 더욱 좋았습니다.

### 11.15

- 리팩터링 및 누락 요구사항 추가

### 11.12

- Prop Drilling 형태의 과제 완료
