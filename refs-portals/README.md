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