import { Avatar, Dropdown } from "flowbite-react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Tabs,
} from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  // const emailInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(logout())
  // },[])

  return (
    <div className="md:mb-20 mb-24">
      <div className="flex justify-between bg-slate-700 gap-3 md:px-4 px-2 py-3 text-white items-center fixed top-0 w-full z-10">
        <NavLink to="/">
          <h1 className="text-lg">Logo Tech.</h1>
        </NavLink>
        <ul className="flex gap-5">
          <NavLink
            to="/"
            className={(e) => {
              return e.isActive
                ? "text-red-500 font-semibold hover:text-red-600"
                : "hover:text-slate-200";
            }}
          >
            <li className="cursor-pointer">Home</li>
          </NavLink>
          <NavLink
            to="/about"
            className={(e) => {
              return e.isActive
                ? "text-red-500 font-semibold hover:text-red-600"
                : "hover:text-slate-200";
            }}
          >
            <li className="cursor-pointer">About</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={(e) => {
              return e.isActive
                ? "text-red-500 font-semibold hover:text-red-600"
                : "hover:text-slate-200";
            }}
          >
            <li className="cursor-pointer">Contact</li>
          </NavLink>
        </ul>
        {/* <img  className='w-8 rounded-full cursor-pointer' src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' alt=''/> */}

        {user ? (
          <div className="flex md:gap-5 gap-1">
            <NavLink
              to="/cart"
              // className={(e) => {
              //   return e.isActive ? "border-2 border-cyan-700" : "";
              // }}
              // className="border-2 border-cyan-700"
            >
              <button
                className="flex gap-2 items-center bg-gray-500 hover:bg-gray-600 text-white md:px-3 px-1 py-2"
                // onClick={() => {
                //   navigate("/cart");
                // }}
              >
                <FaShoppingCart />
                Cart
              </button>
            </NavLink>
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  img="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  rounded
                />
              }
              arrowIcon={false}
              inline
              // className='text-black'
            >
              <Dropdown.Header className="w-40">
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              {/* <Dropdown.Item>Dashboard</Dropdown.Item> */}
              <NavLink to="/myorders">
                <Dropdown.Item>My Orders</Dropdown.Item>
              </NavLink>

              <NavLink to="/editprofile">
                <Dropdown.Item>Edit Profile</Dropdown.Item>
              </NavLink>

              <NavLink to="/cart">
                <Dropdown.Item>My Cart</Dropdown.Item>
              </NavLink>

              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setOpenModal(false);
                  dispatch(logout());
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenModal(true)}>Login</Button>
            <Modal
              show={openModal}
              size="md"
              popup
              onClose={() => setOpenModal(false)}
              // initialFocus={emailInputRef}
            >
              <Modal.Header />
              <Modal.Body>
                <Tabs aria-label="Default tabs" style="default">
                  <Tabs.Item active title="Login">
                    <Login openModal={openModal} setOpenModal={setOpenModal} />
                  </Tabs.Item>
                  <Tabs.Item title="SignUp">
                    <Signup openModal={openModal} setOpenModal={setOpenModal} />
                  </Tabs.Item>
                </Tabs>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
