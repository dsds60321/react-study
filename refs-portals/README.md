# Refs & Portals
## useRef
* DOM에 접근: useRef를 사용해서 React 컴포넌트 내부의 DOM 요소에 접근할 수 있습니다.
* 변경 가능한 값 저장: useRef는 .current 속성을 갖는 객체를 반환하며, 여기에 저장된 값은 컴포넌트 라이프사이클 동안 변할 수 있지만 컴포넌트를 리렌더링하지 않습니다.
```javascript
import React, { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  // DOM 요소에 접근하기 위한 ref 생성
  const inputEl = useRef();

  // 버튼 클릭 시 input 요소에 포커스를 주는 함수
  const onButtonClick = () => {
    // 'current' 속성을 통해 input 엘리먼트에 접근하고 조작
    inputEl.current.focus();
  };

  return (
    <>
      {/* ref 속성을 통해 inputEl에 엘리먼트 참조 연결 */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;
```
## 상태와 참조
### 상태
* 상태는 컴포넌들의 재실행을 야기한다.
* 상태는 UI에 바로 반영되어야하는 값들이 있을 때만 사용해야 합니다.
* 시스템 내부에 보이지 않는 쪽에서만 다루는 값들이나 UI에 직접적인 영향이 없는 값들은 사용하지 말아야 한다.

### 참조
* 참조에 업데이트로 컴포넌트들이 다시 실행되지 않습니다.
* DOM 요소에 직접적인 접근이 필요할떄 사용합니다.

## Portals
* 리액트 포털은 일반적인 리액트 트리 계층 바깥에 있는 DOM 노드로 자식 컴포넌트를 렌더링하는 데 사용되는 고급 기능입니다. 
<br/>이 기능은 모달, 툴팁, 드롭다운과 같이 부모 컴포넌트의 DOM 계층을 벗어나 렌더링 해야 할 때 유용합니다.

### 기능
* 렌더링 위치의 유연성: 리액트 포털을 사용하면, 컴포넌트를 부모의 계층 구조가 아닌 다른 위치의 DOM 노드로 렌더링할 수 있습니다.
* 모달 및 팝업 관리: 페이지의 레이아웃이나 z-index 문제로 인해 모달이나 팝업 등을 원활히 관리할 수 있습니다.

### 유의점
* 이벤트 버블링: 포털을 통해 생성된 자식 컴포넌트는 DOM 트리에는 별개의 위치에 있더라도, 리액트 트리 내에서는 여전히 부모 컴포넌트에 속하므로,
<br>이벤트 버블링은 리액트 컴포넌트 트리를 따릅니다.

```javascript
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Modal 노드를 modalRoot에 추가합니다.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Modal 노드를 제거합니다.
    modalRoot.removeChild(this.el);
  }

  render() {
    // createPortal을 이용하여 자식을 modalRoot DOM 트리로 이동시킵니다.
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

function App() {
  return (
    <div>
      <h1>앱 컨텐츠</h1>
      <Modal>
        <div>모달 컨텐츠</div>
      </Modal>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app-root'));
```


