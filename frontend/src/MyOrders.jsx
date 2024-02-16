import { Accordion, Badge } from "flowbite-react";
import { useEffect } from "react";
import { HiCheck, HiClock } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, reset } from "./store/order/orderSlice";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    orderItems,
    isFetchOrderError: isError,
    isFetchOrderSuccess: isSuccess,
    isFetchOrderLoading: isLoading,
    isFetchOrderMessage: message,
  } = useSelector((state) => state.order);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      console.log("success order/fetch");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const orderDisplay = orderItems?.map((oneOrder, index) => (
    <Accordion.Panel>
      <Accordion.Title>
        <div className="flex items-center gap-3">
          <Badge color="yellow" icon={HiCheck} />
          <span className="font-bold text-lg">
            ₹{oneOrder.orderItems.reduce((acc, obj) => acc + obj.price, 0)}
          </span>{" "}
          ({oneOrder.orderItems.length} Items)
          <Badge color="warning">Pending</Badge>
          <div className="md:block hidden">
            <Badge color="purple" icon={HiClock}>
              Ordered on {moment(oneOrder.createdAt).format("DD-MM-YYYY")}
            </Badge>
          </div>
          <div className="md:block hidden">
            <Badge color="gray" icon={HiClock}>
              Delivering Soon
            </Badge>
          </div>
        </div>
      </Accordion.Title>
      <Accordion.Content>
        <div className="md:flex items-center justify-between px-2">
          <div>
            <p>
              <span className="font-semibold">Id - </span>
              {oneOrder._id}
            </p>
            <p>
              <span className="font-semibold">Order Creation Id - </span>
              {oneOrder.orderDetails.orderCreationId}
            </p>
            <p>
              <span className="font-semibold">Order Id - </span>
              {oneOrder.orderDetails.orderId}
            </p>
            <p>
              <span className="font-semibold">Payment Id - </span>
              {oneOrder.orderDetails.paymentId}
            </p>
          </div>
          <div className="">
            {oneOrder.delivery.isDelivered ? (
              <div>
                <Badge color="success" className="my-2">
                  Delivered
                </Badge>
                <Badge color="purple" icon={HiClock} className="my-2">
                  Ordered on {moment(oneOrder.createdAt).format("DD-MM-YYYY")}
                </Badge>
                <Badge icon={HiClock} className="my-2">
                  Delivered on 14/6/2024
                </Badge>
              </div>
            ) : (
              <div>
                <Badge color="warning" className="my-2">
                  Pending
                </Badge>
                <Badge color="purple" icon={HiClock} className="my-2">
                  Ordered on {moment(oneOrder.createdAt).format("DD-MM-YYYY")}
                </Badge>
                <Badge color="gray" icon={HiClock} className="my-2">
                  Delivering Soon
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="md:flex md:border-2 px-2 mt-2">
          <div className="md:w-3/5">
            <h1 className="text-center text-xl">Order Details</h1>
            <div>
              {/* <ol style={{ listStyleType: "lower-roman" }}>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                  </ol> */}
              <ol style={{ listStyleType: "decimal" }} className="px-4">
                {oneOrder.orderItems.map((item, index) => (
                  <li>
                    <span className="font-semibold">₹{item.price}</span> X{" "}
                    {item.title}
                  </li>
                ))}
              </ol>
              <h2 className="text-xl font-semibold m-3">
                Total - ₹
                {oneOrder.orderItems.reduce((acc, obj) => acc + obj.price, 0)}
              </h2>
            </div>
          </div>
          <div className="md:w-2/5 px-2 md:border-l-2 pb-2">
            <h1 className="text-center text-xl">Address</h1>
            <p>{oneOrder.address.name}</p>
            <p>{oneOrder.address.mobile}</p>
            <p>{oneOrder.address.pincode}</p>
            <p>{oneOrder.address.area}</p>
            <p>{oneOrder.address.city}</p>
            <p>{oneOrder.address.state}</p>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Panel>
  ));

  if (orderItems?.length == 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">No Orders till now</h1>
        <Link to="/">
          <p className="text-xl underline text-yellow-400 font-semibold">
            Shop Now
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:w-3/4 mx-auto">
      <h1 className="text-3xl font-semibold my-2">My Orders</h1>
      <Accordion collapseAll className="">
        {orderDisplay}
        {/* <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center md:gap-3">
              <Badge color="yellow" icon={HiCheck} />
              <span className="font-bold text-lg">₹5999</span> (4 Items)
              <Badge color="warning">Pending</Badge>
              <Badge color="purple" icon={HiClock}>
                Ordered on 15/5/2024
              </Badge>
              <Badge color="gray" icon={HiClock}>
                Delivering in 2 days
              </Badge>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <div className="md:flex items-center justify-between px-2">
              <div>
                <p>Id - {orderItems[0]?._id}</p>
                <p>Order Creation Id</p>
                <p>Order Id</p>
                <p>Payment Id</p>
              </div>
              <div className="">
                <Badge color="warning" className="my-2">
                  Pending
                </Badge>
                <Badge color="purple" icon={HiClock} className="my-2">
                  Ordered on 15/5/2024
                </Badge>
                <Badge color="gray" icon={HiClock} className="my-2">
                  Delivering in 2 days
                </Badge>
              </div>
            </div>

            <div className="md:flex md:border-2 px-2 mt-2">
              <div className="md:w-3/5">
                <h1 className="text-center text-xl">Order Details</h1>
                <div>
                  <ol style={{ listStyleType: "decimal" }} className="px-4">
                    <li>
                      <span className="font-semibold">₹5999</span> X Item1
                    </li>
                    <li>
                      <span className="font-semibold">₹4999</span> X Item2
                    </li>
                    <li>
                      <span className="font-semibold">₹7999</span> X Item3
                    </li>
                    <li>
                      <span className="font-semibold">₹6999</span> X Item4
                    </li>
                  </ol>
                  <h2 className="text-xl font-semibold m-3">Total - ₹12999</h2>
                </div>
              </div>
              <div className="md:w-2/5 px-2 md:border-l-2">
                <h1 className="text-center text-xl">Address</h1>
                <p>name</p>
                <p>mobile</p>
                <p>pincode</p>
                <p>area</p>
                <p>city</p>
                <p>state</p>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex items-center gap-3">
              <Badge color="green" icon={HiCheck} />
              <span className="font-bold text-lg">₹7999</span> (2 Items)
              <Badge color="success">Delivered</Badge>
              <Badge color="purple" icon={HiClock}>
                Ordered on 11/8/2024
              </Badge>
              <Badge icon={HiClock}>Delivered on 14/6/2024</Badge>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the
              <a
                href="https://flowbite.com/figma/"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Figma design system
              </a>
              based on the utility classes from Tailwind CSS and components from
              Flowbite.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What are the differences between Flowbite and Tailwind UI?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that Flowbite relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              However, we actually recommend using both Flowbite, Flowbite Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Panel> */}
      </Accordion>
    </div>
  );
};

export default MyOrders;
