import { Button, Modal, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, reset } from "../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CardHorizontal = ({
  id,
  imageUrl,
  title,
  price,
  inStock,
  description,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    cartItems,
    isAddToCartLoading: isLoading,
    isAddToCartError: isError,
    isAddToCartSuccess: isSuccess,
    isAddToCartMessage: message,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const checkProductInCart = () => {
    if (user) {
      // console.log(cartItems);
      // console.log(id);
      let check = cartItems.some((obj) => obj._id === id);

      // console.log(check);
      if (check) {
        setInCart(true);
        return true;
      } else {
        setInCart(false);
        return false;
      }
    }
    setInCart(false);
    return false;
  };

  // let discp = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic optio,autem voluptates suscipit earum vel expedita ducimus dolorem eaofficia minus a distinctio natus. Est distinctio doloremque ducimus aspernatur sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic optio,autem voluptates suscipit earum vel expedita ducimus dolorem eaofficia minus a distinctio natus. Est distinctio doloremque ducimus aspernatur sapiente?`;
  const addProductToCart = () => {
    console.log(inCart);
    dispatch(addToCart({ product_id: id }));
  };

  useEffect(() => {
    console.log(checkProductInCart());
  }, []);

  useEffect(() => {
    // console.log(checkProductInCart());
    // console.log("checking");
    checkProductInCart();
  }, [user]);

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    if (isSuccess) {
      console.log("success cart/add");
      checkProductInCart();
    }

    dispatch(reset());
  }, [cartItems, isError, isSuccess, message, dispatch]);

  return (
    <div className="md:flex border-2">
      <img
        className="md:w-1/2 md:h-96"
        src={
          imageUrl
            ? imageUrl
            : "https://www.popsci.com/uploads/2019/12/28/Apple-Watch-on-table.jpg?auto=webp&width=1440&height=1080"
        }
        alt=""
      />

      <div className="m-2 ">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title
            ? title
            : "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport"}
        </h5>

        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{price ? price : "599"}
        </p>

        <div className="my-2 flex items-center">
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            5.0
          </span>
        </div>

        {Number(inStock) ? (
          <button className="mb-2 rounded bg-purple-100 px-2.5 py-0.5 text-md font-semibold text-purple-800 dark:bg-purple-300 dark:text-purple-800">
            In Stock - {inStock}
          </button>
        ) : (
          <button className="mb-2 rounded bg-red-100 px-2.5 py-0.5 text-md font-semibold text-red-800 dark:bg-red-300 dark:text-red-800">
            Not Avaliable
          </button>
        )}

        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          Product Discription
        </h5>

        <div className="font-normal text-gray-700 dark:text-gray-400">
          {description.length > 250 ? (
            <div>
              {description.substring(0, 250)}{" "}
              <button
                className="text-gray-700 font-semibold"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                ...Read More
              </button>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Description</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {description}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setOpenModal(false)}>OK</Button>
                  {/* <Button color="gray" onClick={() => setOpenModal(false)}>
                    Decline
                  </Button> */}
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            description
          )}
        </div>

        <div className="my-2">
          {inCart ? (
            <button
              className="my-2 bg-orange-400 hover:bg-orange-500 text-white p-3"
              onClick={() => navigate("/cart")}
            >
              GO TO CART
            </button>
          ) : (
            <button
              className="my-2 bg-orange-500 hover:bg-orange-600 text-white p-3"
              onClick={addProductToCart}
            >
              {isLoading && (
                <Spinner
                  aria-label="Spinner button example"
                  size="md"
                  className="mr-2"
                />
              )}
              ADD TO CART
            </button>
          )}
          <button
            className="m-2 bg-green-500 hover:bg-green-600 text-white p-3"
            onClick={() => {
              addProductToCart();
              if (user) navigate("/cart");
            }}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
