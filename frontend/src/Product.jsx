import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHorizontal from "./components/CardHorizontal";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneProduct, reset } from "./store/product/productSlice";

const Product = () => {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    product,
    isFetchOneProductLoading: isLoading,
    isFetchOneProductError: isError,
    isFetchOneProductSuccess: isSuccess,
    isFetchOneProductMessage: message,
  } = useSelector((state) => state.product);

  useEffect(() => {
    console.log(productId);
    window.scrollTo(0, 0);
    dispatch(fetchOneProduct({ productId }));
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate("/notfound");
    }

    if (isSuccess) {
      console.log("success productOne/fetch");
    }

    dispatch(reset());
  }, [product, isError, isSuccess, message, dispatch]);

  return (
    <div className="min-h-screen">
      {product ? (
        <div>
          <div className="w-11/12 m-4">
            <CardHorizontal {...product} id={productId} />
          </div>

          <div className="m-4 w-11/12 border-2">
            <h1 className="text-center text-3xl m-2">Comments</h1>
            <textarea
              className="mx-3 block w-11/12 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text"
              placeholder="Comment..."
            ></textarea>

            <div className="m-3 border-2 rounded-md bg-gray-300 w-3/4">
              <div className="flex items-center">
                <img
                  className="w-8 rounded-full m-2"
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt=""
                />
                <p>Name</p>
              </div>
              <p className="mx-2 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                neque iure ducimus, autem unde quibusdam nemo nulla, nobis non
                dolorem tempore illo voluptates sequi eum amet itaque iusto.
                Similique, enim.
              </p>
            </div>
            <div className="m-3 border-2 rounded-md bg-gray-300 w-3/4">
              <div className="flex items-center">
                <img
                  className="w-8 rounded-full m-2"
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt=""
                />
                <p>Name</p>
              </div>
              <p className="mx-2 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                neque iure ducimus, autem unde quibusdam nemo nulla, nobis non
                dolorem tempore illo voluptates sequi eum amet itaque iusto.
                Similique, enim.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl">Loading...</div>
      )}
    </div>
  );
};

export default Product;
