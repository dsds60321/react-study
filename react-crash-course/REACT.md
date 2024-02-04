# REACT
1. swc(speed web compiler)
2. jsx가 무엇인가
3. html 코드는 jsx 코드
4. 애플리케이션에 진입점이 되는 코드 웹사이트가 로딩될때 제일 먼저 실행됨
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// root에 react jsx 코드를 렌더링 하는 코드
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
```
5. react에서 컴포넌트에 이름에 처음은 항상 대문자 함수 안에서는 함상 jsx 코드 반환하기
6. JSX 컴포넌트 소문자로 시작한다면 html 코드로 간주 대문자라면 jsx 인식하여 커스텀 컴포넌트 함수를 실행합니다.
7. {} 중괄호로 함수에 자바스크립트 코드를 넣을수 있습니다.
```javascript
const chosenName = Math.random() > 0.5 ? names[0] : names[1];
  return (
    <div>
      <p>{chosenName}</p>
```
8. 컴포넌트 재사용
   1. 동일한 컴포넌트를 여러개 사용한다면 함수가 컴포넌트 별로 실행된다.
   2. 하나에 컴포넌트 혹은 빌트인 컴포넌트들을 여러번 재사용하려면 상위 컴포넌트가 감싸고 있어야합니다. jsx가 반환되는 요소는 단 하나여야합니다.
      1. 어떠한 태그든 형제 요소가 2개 이상 있을수 없다. 있을 경우 최상위 태그가 존재해야한다.
   3. 시작과 종료 태그가 비어있는 값을 사용해도 상관없습니다. <></>
9. 컴포넌트간 속성 전달
   1. props : 전달받은 인자에 객체 형태로 되어 있으며 넣은 값이 속성으로 들어가 있습니다.
```javascript
function App() {
   return (
           <main>
              <Post author={"Maximilian"} body={"React.js is awesome!"} />
              <Post author={"Manuel"} body={"Check out the full course!"} />
           </main>
   );
}

function Post(props) {
   return (
           <div>
              <p>{props.author}</p>
              <p>{props.body}</p>
           </div>
   );
}
```

10. react style 추가하기
    1. 하이픈은 제거하고 카멜케이스로 사용 {{ 중괄호 두겹으로 감싸며 자바스크립트 코드를 안에 작성하여 css 작성이 가능합니다.
```javascript
<div style={{color: 'red', txtAlign: 'left'}}
```
2. classes 을 설정해 객체 속성에 접근해 클래스 이름을 받는다.
```javascript
import classes from "./Post.module.css";

function Post(props) {
  return (
    <div className={classes.post}>
      <p className={classes.author}>{props.author}</p>
      <p className={classes.text}>{props.body}</p>
    </div>
  );
}

export default Post;

```
* html에 for -> htmlfor 대신 사용한다.

### 상태
* JSX 코드는 처음 컴포넌트 함수들만 가져가서 실행하기에 특정 이벤트가 발생햇을때 컴포넌트를 재 실행하여 ui를 보여주지 않는다.
* 그러므로 아래와 같은 코드는 동작하지 않는다.
* useState라는 리액트 훅 등을 사용해서 표기한다.
  * 리액트 훅등은 컴포넌트 함수 안에서만 사용해야합니다.
    * useState('기본값'); 반환은 배열을 반환하며 첫번째 인덱스는 현재값 두번째 인덱스는 현재값에 업데이트 함수를 반환합니다. 
    <br>값을 변경한다면 새 상태 값을 저장하는것뿐만 아니라 리액트가 이전 스냅샷과 비교해 다르다면 ui를 업데이트 한다.
```javascript

const [enteredBody, setEnteredBody] = useState("");
function changeBodyHandler(event) {
   setEnteredBody(event.target.value);
}

<textarea id="body" required rows={3} onChange={changeBodyHandler} />
<p>{enteredBody}</p>
```
* 샹태 올리기 props 객체는 리액트가 자동으로 컴포넌트로 넘겨줍니다.
* children 리액트 props에 속성을 통해 랩퍼 컴포넌트가 자식 컴포넌트를 감싸는 영역을 지정할수 있다.
* Modal 태그가 NewPost를 감싸고 props.children속성으로 들어갈 컴포넌트에 위치를 표시하여 영역을 잡아줄수 있다.
```javascript
<Modal>
   <NewPost
           onBodyChange={bodyChangeHandler}
           onAuthorChange={authorChangeHandler}
   />
</Modal>

function Modal({ children }) {
   return (
           <>
              <div className={classes.backdrop} />
              <dialog open className={classes.modal}>
                 {children}
              </dialog>
           </>
   );
}
```

```javascript
{modalIsVisible ? (
  <Modal onClose={hideModalHandler}>
    <NewPost
      onBodyChange={bodyChangeHandler}
      onAuthorChange={authorChangeHandler}
    />
  </Modal>
) : null}
```

```javascript
let modalContent;

if (modalIsVisible) {
  modalContent = (
    <Modal onClose={hideModalHandler}>
      <NewPost
        onBodyChange={bodyChangeHandler}
        onAuthorChange={authorChangeHandler}
      />
    </Modal>
  );
}

return (
  <>
    {modalContent}
    <ul className={classes.posts}>
      <Post author={enteredAuthor} body={enteredBody} />
      <Post author={enteredAuthor} body={enteredBody} />
    </ul>
  </>
);
```
* null은 react에서 렌더링 되지 않는다.

* 이전 데이터를 갱신해야하는경우 바로 set함수를 이용해 상태를 변경하는 코드는 좋지 않다 리액트에 상태 갱신은 곧바로 진행되는게 아니기 때문에
<br>화살표 함수를 통해 곧바로 실행되게 하여야 한다. 화살표 함수 인자에는 이전 데이터가 들어가 있다.
```javascript
function addPostHandler(postData) {
// setPosts([postData, ...posts]); 이전 데이터를 갱신할떄 사용하는건 비추
setPosts((existingPost) => [postData, ...existingPost]);
}
```
* 데이터를 jsx코드로 변경해서 컴포넌트를 생성할때는 map 메서드를 사용한다.