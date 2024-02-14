import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { fetchProducts, reset } from "../store/product/productSlice";

const ShowProducts = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const {
    products,
    isFetchProductLoading: isLoading,
    isFetchProductError: isError,
    isFetchProductSuccess: isSuccess,
    isFetchProductMessage: message,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      console.log("success product/fetch");
    }

    dispatch(reset());
  }, [products, isError, isSuccess, message, dispatch]);

  const productItems = products.map((product, index) => (
    <Card {...product} key={index} />
  ));

  return (
    <div className="w-11/12 mx-auto my-4">
      <div className="flex justify-between">
        <h1 className="my-2 text-2xl">TOP DEALS</h1>
        <button className="bg-slate-600 text-white p-2 m-2 rounded">
          Category Select
        </button>
      </div>
      <div className="grid md:grid-cols-5 gap-2">{productItems}</div>
    </div>
  );
};

export default ShowProducts;
