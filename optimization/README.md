# REACT 최적화

## 리액트는 어떻게 DOM을 업데이트 하는가?
* 리액트는 Virtual DOM을 사용하여 효율적으로 실제 DOM을 업데이트합니다.
* Virtual DOM: 변화가 필요할 때마다 전체 UI를 Virtual DOM에 렌더링하고, 이전 Virtual DOM과 비교합니다.
* Diffing Algorithm: 변경 사항을 식별한 후에, 실제 DOM에는 변경된 부분만을 업데이트합니다. 이렇게 하여 성능을 크게 개선할 수 있습니다.
* Batch Update: 리액트는 여러 상태 변경을 비동기적으로 일괄 처리하여 DOM 업데이트를 최적화합니다.
## 사용자가 보는 화면을 어떻게 업데이트 하는가?
* 리액트는 상태(state)나 속성(props)의 변화를 감지하여 컴포넌트를 다시 렌더링하고, 이때 변경된 부분에 한해서 사용자 인터페이스를 업데이트합니다.
* Reconciliation: 리액트는 이전 렌더링 결과와 새로운 결과를 비교해서 실제 DOM에 필요한 최소한의 업데이트를 수행하는 과정입니다.
* UI 우선순위 조절: 리액트 18에서는 useTransition이나 useDeferredValue 같은 새로운 훅을 사용하여 중요한 UI 업데이트를 우선적으로 처리할 수 있습니다.
## 컴포넌트 함수들은 어떻게 실행되는가?
* 컴포넌트 함수들은 리액트의 라이프사이클에 따라 결정된 순서와 방법으로 실행됩니다.
* 생성(Mounting): 컴포넌트가 생성되는 단계에서는 constructor, render, 그리고 componentDidMount 같은 라이프사이클 메소드가 실행됩니다.
* 업데이트(Updating): 상태나 속성의 변화가 발생하면 리액트는 shouldComponentUpdate, render, componentDidUpdate를 순서대로 실행하여 변화를 반영합니다.
* 제거(Unmounting): 컴포넌트가 DOM에서 제거될 때 componentWillUnmount가 실행되어 필요한 정리(clean-up) 작업을 수행합니다. [1]

## React memo
* React.memo는 React의 고차 컴포넌트(HOC)로, 컴포넌트의 불필요한 렌더링을 방지하기 위해 사용됩니다. 특히 부모 컴포넌트가 렌더링될 때마다 자식 컴포넌트도 렌더링되는 것을 방지하기 위한 목적으로 사용되며, props의 변화가 없으면 React.memo로 감싼 컴포넌트를 재렌더링하지 않습니다.
### 유의점
1. Primitive 값이 아닌 객체나 배열 등의 props를 다룰 때는 얕은 비교로 인해 예상치 못한 재렌더가 발생할 수 있으므로 주의가 필요합니다.
2. 컴포넌트 내부에서 상태(state)가 있거나, 컨텍스트(Context), 구독(Subscription) 등의 side effect를 다룬다면 React.memo의 효과가 제한적일 수 있습니다.
3. 성능 최적화 수단으로만 사용해야 하며, 모든 컴포넌트에 React.memo를 적용하는 것은 바람직하지 않습니다. 실제 성능 문제가 있는 컴포넌트에 대해서만 사용하는 것이 좋습니다.
```javascript
import React from 'react';

const MyComponent = React.memo(function MyComponent(props) {
  // 컴포넌트 렌더링 로직
  return <div>{props.value}</div>;
});

function ParentComponent(props) {
  // 부모 컴포넌트의 상태
  const [value, setValue] = React.useState(0);

  // 상태를 업데이트하는 함수
  const handleClick = () => {
    setValue(prevValue => prevValue + 1);
  };

  return (
    <>
      <MyComponent value={value} /> {/* React.memo로 감싼 컴포넌트 */}
      <button onClick={handleClick}>Increment</button>
    </>
  );
}

export default ParentComponent;
//이 예제에서 MyComponent는 React.memo로 감싸져있어, value props가 변경될 때에만 재렌더링됩니다. 
// ParentComponent의 다른 상태나 props가 변경되어도 MyComponent는 재렌더링되지 않습니다.
```

## useCallback 훅
* useCallback 훅은 함수를 메모이제이션(memoization)하는 훅입니다. 이 말은 즉슨,
<br/>컴포넌트가 리렌더링이 되더라도 특정 조건(의존성 배열 내의 값)이 변경되지 않는 한, 해당 함수의 참조값을 유지한다는 것을 의미합니다.
<br/>함수의 참조값이 유지되면 함수를 props로 전달받는 자식 컴포넌트들이 불필요한 리렌더링을 방지할 수 있기 때문에 성능 최적화에 도움이 됩니다.
### 유의점
1. 의존성 배열(deps): useCallback의 두 번째 인자에 전달되는 배열입니다. 배열 내의 값이 변경되었을 때만 함수가 새로 생성됩니다. 정확한 의존성을 입력하는 것이 중요합니다.
2. 필요성: 모든 함수를 useCallback으로 감싸는 것은 불필요할 수 있습니다. 성능상의 주된 문제가 되는 경우에만 사용하세요.
3. 최적화: 자식 컴포넌트에 함수를 props로 전달하고 해당 자식 컴포넌트가 React.memo 또는 shouldComponentUpdate를 사용하는 경우에 유용합니다.
4. 지나친 최적화: 불필요한 최적화는 오히려 성능을 저하시킬 수 있으니 주의가 필요합니다. 의존성 배열 관리에 드는 비용 역시 고려해야 합니다.

```javascript
import React, { useState, useCallback } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 리렌더링 되어도 동일한 함수 참조를 유지

  return (
    <div>
      Count: {count}
      <button onClick={increment}>Increase</button>
    </div>
  );
}
// 위 예제에서 increment 함수는 useCallback에 의해 메모이제이션 되므로, ExampleComponent가 리렌더링 될 때 마다 새로 만들어지지 않습니다.
```

## useMemo 훅
* useMemo 훅은 일반 함수에 대해 사용하는 훅 이며 값의 계산을 메모이제이션하는 훅으로,
<br>리렌더링 과정에서 비용이 큰 계산을 캐싱하여, 필요할 때만 재계산하도록 도와줍니다. 
<br>이렇게 함으로써 성능을 최적화할 수 있습니다. 특정 의존성 값이 변경되었을 때만 계산이 다시 이루어지게 됩니다.

### 유의점
1. 의존성 배열: useMemo의 두 번째 인자에 전달되는 의존성 배열입니다. 배열 내의 값들이 변경될 때만 메모이제이션된 값이 갱신됩니다.
2. 비용이 큰 계산: 오로지 계산 비용이 큰 작업에 대해서만 useMemo를 사용하세요. 간단한 연산에 대해서는 필요하지 않을 수 있습니다.
3. 최적화: 최적화는 필요할 때만 해야 합니다. 모든 값을 memorize할 필요는 없으며 때로는 불필요한 메모리 사용을 야기할 수 있습니다.
4. 참조 동일성: 메모이제이션은 객체나 배열 같은 참조 타입의 값에 대한 참조 동일성을 보존하는데 이용될 수 있습니다. 즉, 의존성이 변하지 않는 한, 동일한 객체나 배열 참조를 유지하게 됩니다.

```javascript
import React, { useMemo } from 'react';

function ExpensiveComponent({ num }) {
  const computeExpensiveValue = (a) => {
    console.log('Expensive computation');
    return a * 2; // 복잡한 계산을 대표하는 예제
  };

  const computedValue = useMemo(() => computeExpensiveValue(num), [num]);

  return <div>Computed Value: {computedValue}</div>;
}
// 위의 컴포넌트는 num props가 변경될 때만 computeExpensiveValue 함수를 다시 실행하고 
// 그 결과를 computedValue에 저장합니다. 이는 계산 비용이 큰 작업을 반복적으로 수행하지 않도록 하는데 유용합니다.
```

## 리액트 상태에 Key의 역활
* 리액트(React)에서는 동적인 리스트를 렌더링할 때 각 리스트 항목에 key 속성을 제공하는 것이 매우 중요합니다. key는 리액트가 DOM의 어떤 항목이 변경, 추가 또는 삭제되었는지 파악하는 데 도움을 주는 핵심 요소입니다.
### Key의 필요성
* 성능 최적화: 각각의 요소를 구별하여 리액트가 가상 DOM과 실제 DOM 간의 차이를 효율적으로 계산하고 필요한 부분만 업데이트하기 때문에 애플리케이션의 성능을 개선할 수 있습니다.
* 재사용 및 리렌더링 최소화: 리스트의 항목이 변경되었을 때, key를 통해 어떤 요소가 변경되었는지를 파악하여 불필요한 리렌더링을 방지합니다. 이로 인해 리엑트 컴포넌트의 리렌더링 횟수를 줄일 수 있습니다.

### 주의점
* 고유성: key 값은 형제 요소 사이에서 고유해야 합니다. 중복되는 key를 가진 요소들은 예측 불가능한 동작을 일으킬 수 있습니다.
* 안정성: 리스트의 항목 순서가 바뀌거나 업데이트될 가능성이 있는 경우, 인덱스를 key 값으로 사용하는 것은 피해야 합니다. 안정적으로 일관된 식별자를 key로 제공해야 합니다. 예를 들면, 데이터의 고유 ID를 key 값으로 사용하는 것이 좋습니다.
