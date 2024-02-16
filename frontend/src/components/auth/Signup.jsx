import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { register, reset } from "../../store/auth/authSlice";

const Signup = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const {
    user,
    isRegisterLoading: isLoading,
    isRegisterError: isError,
    isRegisterSuccess: isSuccess,
    isRegisterMessage: message,
  } = useSelector((state) => state.auth);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errmsg, setErrmsg] = useState("");

  useEffect(() => {
    if (isSuccess) {
      console.log("register/success");
    }

    if (isError) {
      setErrmsg(message);
    }

    dispatch(reset());
  }, [isError, message]);

  const { name, email, password } = registerData;

  const onRegisterChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!name || !email || !password) {
      return setErrmsg("Please enter all fields");
    }

    if (reg.test(email) === false) {
      return setErrmsg("Invaid Email");
    }

    if (name.length < 3) {
      return setErrmsg("Name must contain atleast 3 characters");
    }
    if (password.length < 6) {
      return setErrmsg("Password must contain atleast 6 characters");
    }

    const userData = {
      name,
      email,
      password,
    };

    console.log(userData);

    dispatch(register(userData));
  };

  return (
    <div>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign up to our platform
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
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="text"
            name="name"
            value={name}
            placeholder="Name"
            required
            onChange={onRegisterChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            name="email"
            value={email}
            placeholder="name@company.com"
            required
            onChange={onRegisterChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            value={password}
            type="password"
            required
            onChange={onRegisterChange}
          />
        </div>
        {/* <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                  Lost Password?
                </a>
              </div> */}
        <div className="w-full">
          <Button onClick={onRegisterSubmit}>Sign Up</Button>
        </div>
        {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?&nbsp;
                <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                  Create account
                </a>
              </div> */}
      </div>
    </div>
  );
};

export default Signup;
