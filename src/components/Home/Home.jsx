import { useProducts } from "../../queries/useProducts";
import "./Home.css";
import Product from "./Products/Product";
const Home = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong while fetching products.</h1>;
  const products = data?.products || [];
  // console.log(products[0].images);
  return (
    <>
      <div className="products-container">
        {products.map((product) => (
          <Product
            name={product.name}
            price={product.price}
            key={product._id}
            img={product.images[0]}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
