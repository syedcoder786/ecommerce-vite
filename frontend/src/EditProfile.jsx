import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  FloatingLabel,
  Textarea,
  Toast,
  FileInput,
} from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, reset } from "./store/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isAddAddressLoading: isLoading,
    isAddAddressError: isError,
    isAddAddressSuccess: isSuccess,
    isAddAddressMessage: message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      // console.log(message);
      setErrmsg(message);
    }

    if (isSuccess) {
      toast.success("Address Edited");
      console.log("success");
      //   setOpenModal(false);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const [addressData, setAddressData] = useState({
    name: user?.address.name,
    mobile: user?.address.mobile,
    pincode: user?.address.pincode,
    city: user?.address.city,
    state: user?.address.state,
    area: user?.address.area,
  });

  const { name, mobile, pincode, city, state, area } = addressData;

  const [errmsg, setErrmsg] = useState("");

  const [profileData, setProfileData] = useState({
    user_name: "",
    file: "",
  });

  const { user_name, file } = profileData;

  const [errpmsg, setErrpmsg] = useState("");

  const onAddressChange = (e) => {
    setAddressData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onProfileChange = (e) => {
    setProfileData((prevState) => ({
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

  return (
    <div>
      <div className="md:w-2/4 md:mx-auto mx-4">
        <h2 className="text-3xl m-2">Personal Details</h2>

        <div className="mb-2 block">
          <Label htmlFor="file" value="Upload file" />
        </div>
        <FileInput
          name="file"
          helperText="A profile picture is useful to confirm your are logged into your account"
          onChange={onProfileChange}
          value={file}
        />

        <br />
        <FloatingLabel
          name="user_name"
          variant="filled"
          label="User Name"
          onChange={onProfileChange}
          value={user_name}
          required
        />
        {/* <div className="w-full"> */}
        <Button
          className="my-3"
          //   onClick={onAddressSubmit}
        >
          Edit Profile
        </Button>

        {/* <hr /> */}

        <h2 className="text-3xl m-3">Address Details</h2>

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
            label="Pin Code"
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
          <Button className="my-3" onClick={onAddressSubmit}>
            Edit Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
