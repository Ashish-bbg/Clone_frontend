import { useProducts } from "../../queries/useProducts";

const Home = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong while fetching products.</h1>;
  const products = data?.products || [];
  return (
    <>
      <h1>Home page</h1>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </>
  );
};

export default Home;
