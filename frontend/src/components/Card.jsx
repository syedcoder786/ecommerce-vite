import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Card = ({ _id, imageUrl, title, price, inStock }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="border-2 rounded-md">
      <img
        className="w-full mx-auto h-64 cursor-pointer"
        src={
          imageUrl
            ? imageUrl
            : "https://eezepc.com/wp-content/uploads/2022/04/WATCH-2-EEZEPC.png"
        }
        alt=""
        onClick={() => {
          console.log("clicked");
          navigate("/product/" + _id);
        }}
      />
      <div className="p-4">
        <a>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {/* {title
              ? title
              : "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport"} */}

            {title.length > 40 ? (
              <div>
                <span
                  onClick={() => {
                    console.log("clicked");
                    navigate("/product/" + _id);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {title.substring(0, 40)}{" "}
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
        </a>

        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{price ? price : "599"}
        </span>
        {/* <p className='p-1'>{discription}</p> */}
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

        {/* <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{price ? price : "599"}
          </span>
          <a
            //   href="#"
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Add to cart
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
