import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, reset } from "../store/cart/cartSlice";

const CardCart = ({ _id, imageUrl, title, price, inStock }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    cartItems,
    isDeleteFromCartLoading: isLoading,
    isDeleteFromCartError: isError,
    isDeleteFromCartSuccess: isSuccess,
    isDeleteFromCartMessage: message,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      console.log("success cart/delete");
    }

    dispatch(reset());
  }, [cartItems, isError, isSuccess, message, dispatch]);

  return (
    // <div>
    <div className="relative md:flex border-2 gap-2 p-2 my-2">
      <img
        className="md:w-1/2 h-40 mx-auto"
        src={
          imageUrl
            ? imageUrl
            : "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
        }
        alt=""
      />
      <div className="w-full">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {/* {title
              ? title
              : "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport"} */}

          {title.length > 50 ? (
            <div>
              <span
                onClick={() => {
                  console.log("clicked");
                  navigate("/product/" + _id);
                }}
                className="hover:underline cursor-pointer"
              >
                {title.substring(0, 50)}{" "}
              </span>
              <button
                className="text-gray-700 font-semibold"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <span className="text-sm">...Read More</span>
              </button>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Title</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {title}
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
            <span
              onClick={() => {
                console.log("clicked");
                navigate("/product/" + _id);
              }}
              className="hover:underline cursor-pointer"
            >
              {title}
            </span>
          )}
        </h5>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{price ? price : "599"}
        </span>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quos odit accusantium sint atque, ab ratione illum odio laboriosam voluptatum deleniti vero obcaecati eius labore, impedit accusamus amet ex modi.</p> */}

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
      </div>

      <button
        onClick={() => setDeleteModal(true)}
        className="absolute right-2 bottom-2 bg-red-500 hover:bg-red-600 rounded text-white py-1 px-2"
      >
        X Remove
      </button>

      <Modal
        show={deleteModal}
        size="md"
        onClose={() => setDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setDeleteModal(false);
                  dispatch(deleteFromCart({ product_id: _id }));
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    // </div>
  );
};

export default CardCart;
