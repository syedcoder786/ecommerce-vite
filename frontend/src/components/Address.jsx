import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  FloatingLabel,
  Textarea,
  Toast,
} from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { addAddress, reset } from "../store/auth/authSlice";

const Address = () => {
  const { user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const {
    products,
    isAddAddressLoading: isLoading,
    isAddAddressError: isError,
    isAddAddressSuccess: isSuccess,
    isAddAddressMessage: message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      // console.log(message);
      setErrmsg(message);
    }

    if (isSuccess) {
      console.log("success");
      setOpenModal(false);
    }

    dispatch(reset());
  }, [products, isError, isSuccess, message, dispatch]);

  const [addressData, setAddressData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    area: "",
  });

  const { name, mobile, pincode, city, state, area } = addressData;

  const [errmsg, setErrmsg] = useState("");

  const onAddressChange = (e) => {
    setAddressData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetailAddress = async (pin) => {
    console.log(pin);
    const req = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const location = await req.json();
    const status = location[0].Status;
    if (status === "Success") {
      const city = location[0].PostOffice[0].Block;
      const state = location[0].PostOffice[0].State;
      console.log(city);
      console.log(state);
      setAddressData((prevState) => ({
        ...prevState,
        city,
        state,
      }));
      // setCity(city)
      // setState(state)
    } else {
      setAddressData((prevState) => ({
        ...prevState,
        city: "",
        state: "",
      }));
      // setCity("")
      // setState("")
      // setFormData((prevState) => ({
      //   ...prevState,
      //   city:"",
      //   state:"",
      // }));
    }
  };

  const onAddressSubmit = (e) => {
    e.preventDefault();

    const phonePattern = /^[6-9]\d{9}$/;

    if (!name || !mobile || !pincode || !city || !state || !area) {
      return setErrmsg("Please enter all fields");
    }

    if (name.length < 3) {
      return setErrmsg("Name must contain atleast 3 characters");
    }

    if (!phonePattern.test(mobile)) {
      console.log("Invalid Phone");
      return setErrmsg("Invalid Phone");
    }

    if (area.length < 10) {
      return setErrmsg("Area must contain atleast 10 characters");
    }

    const addressData = {
      name,
      mobile,
      pincode,
      city,
      state,
      area,
    };

    console.log(addressData);

    dispatch(addAddress(addressData));
  };

  // useEffect(() => {
  //   console.log(user?.hasOwnProperty("address"));
  // }, []);

  return (
    <div>
      <h1 className="text-2xl">Address</h1>
      {user?.hasOwnProperty("address") ? (
        <p className="text-md mb-1">
          <p>{user.address.name}</p>
          <p>{user.address.mobile}</p>
          <p>{user.address.pincode}</p>
          <p>{user.address.area}</p>
          <p>
            {user.address.city}, {user.address.state}
          </p>
        </p>
      ) : (
        <div>
          {/* <button className="bg-slate-600 hover:bg-slate-700 p-2 my-2 text-white">
            Add Address
          </button> */}

          <Button onClick={() => setOpenModal(true)}>Add Address</Button>
          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Add Address
                </h3>
                {errmsg && (
                  <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                      <HiExclamation className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">{errmsg}</div>
                    <Toast.Toggle onDismiss={() => setErrmsg("")} />
                  </Toast>
                )}
                <div>
                  <FloatingLabel
                    name="name"
                    variant="filled"
                    label="Name"
                    onChange={onAddressChange}
                    value={name}
                    required
                  />
                  <FloatingLabel
                    name="mobile"
                    variant="filled"
                    label="Mobile"
                    onChange={onAddressChange}
                    value={mobile}
                    required
                  />
                  <FloatingLabel
                    name="pincode"
                    variant="filled"
                    label="PinCode"
                    onChange={(e) => {
                      onAddressChange(e);
                      fetchDetailAddress(e.target.value);
                    }}
                    value={pincode}
                    required
                  />
                  <div className="flex gap-2">
                    <FloatingLabel
                      name="city"
                      variant="filled"
                      label="City"
                      onChange={onAddressChange}
                      value={city}
                      required
                      disabled
                    />
                    <FloatingLabel
                      name="state"
                      variant="filled"
                      label="State"
                      onChange={onAddressChange}
                      value={state}
                      required
                      disabled
                    />
                  </div>

                  <Textarea
                    id="comment"
                    placeholder="Address (Area and Streat)"
                    required
                    rows={4}
                    name="area"
                    onChange={onAddressChange}
                    value={area}
                  />
                </div>
                <div className="w-full">
                  <Button onClick={onAddressSubmit}>Save Address</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Address;
