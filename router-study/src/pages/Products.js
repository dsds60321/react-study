import { Link } from "react-router-dom";

function Products() {
  const PRODUCTS = [
    { id: "p1", title: "product1" },
    { id: "p2", title: "product2" },
    { id: "p3", title: "product3" },
  ];
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li>
            <Link to={`/products/${prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
