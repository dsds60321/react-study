# Context-API
* 개념: React 컴포넌트 트리 안에서 데이터를 전역적으로 관리하고 싶을 때 사용합니다.
<br>상위 컴포넌트에서 데이터를 넘겨주면, 하위 컴포넌트 어디에서든 해당 데이터에 접근할 수 있습니다.
* 사용 시점: 주로 단순한 구조에서 공통의 데이터를 다룰 때 적합해요. 예를 들어 사용자의 로그인 상태, 테마 설정 같은 전역 상태를 관리할 때 유용합니다.
```javascript
// store/ context
import {createContext} from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
});

// 부모 컴포넌트 App.jsx
// CartContext에 공유할 데이터를 넣어 자식 컴포넌트에서 사용할 수 있게합니다.
// 함수를 넣어 Context에 값을 수정하는 기능도 공유할수 있습니다.
const ctxValue = {
  items : shoppingCart.items,
  addItemToCart : handleAddItemToCart
}

return (
  <CartContext.Provider value={ctxValue}>
    <Header
      cart={shoppingCart}
      onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
    />
    <Shop>
      {DUMMY_PRODUCTS.map((product) => (
        <li key={product.id}>
          <Product {...product} onAddToCart={handleAddItemToCart} />
        </li>
      ))}
    </Shop>
  </CartContext.Provider>

// 자식 컴포넌트
// useContext라는 react 훅을 이용해 CartContext를 불러 함수나 데이터를 사용 할 수 있습니다.
const { addItemToCart } = useContext(CartContext);
return (
  <article className="product">
    <img src={image} alt={title} />
    <div className="product-content">
      <div>
        <h3>{title}</h3>
        <p className='product-price'>${price}</p>
        <p>{description}</p>
      </div>
      <p className='product-actions'>
        <button onClick={() => addItemToCart(id)}>Add to Cart</button>
      </p>
```
* useContext를 사용하지 않고 CartContext.Consumer라는 태그를 이용할 수 있습니다.
  * 하지만 방식이 복잡하기에 useContext 훅을 사용 많이 합니다.

### 위 와 같은 방식으로 context-api를 사용하다 보면 여러 context를 사용해야 되는 경우가 생깁니다
* 해결 방안 : context내에 provider에 jsx 코드를 children으로 파라미터를 받아 묶어주는 방법이 있습니다.
~~~javascript
export default function CartContextProvider({children}) {
  // ...기존 컴포넌트에 사용 되는 함수들
  const ctxValue = {
    items : shoppingCart.items,
    addItemToCart : handleAddItemToCart,
    updateItemQuantity : handleUpdateCartItemQuantity
  }

  // Provider가 children을 두어 사용
  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>
}
~~~

# useReducer
