import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Label, TextInput, Toast } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';
import { login, reset } from "../../store/auth/authSlice";

const Login = ({ openModal, setOpenModal }) => {

    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    
    const [errmsg, setErrmsg] = useState("")

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isError) {
          setErrmsg(message);
        }
    }, [isError, message]);

    const { email, password } = loginData;

    const onLoginChange = (e) => {
        setLoginData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const onLoginSubmit = (e) => {
        e.preventDefault();

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!email || !password){
            return setErrmsg("Please enter all fields")
        }

        if(reg.test(email) === false){
            return setErrmsg("Invaid Email")
        }
    
        const userData = {
            email,
            password,
        };
    
        dispatch(login(userData));
    };

  return (
    <div><div className="space-y-6">
    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
    
    {errmsg && 
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{errmsg}</div>
            <Toast.Toggle onDismiss={() => setErrmsg("")}/>
        </Toast>
    }
    
    <div>
      <div className="mb-2 block">
        <Label htmlFor="email" value="Your email" />
      </div>
      <TextInput name="email" value={email} onChange={onLoginChange} placeholder="Email" required />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="password" value="Your password" />
      </div>
      <TextInput type="password" name="password" value={password} onChange={onLoginChange} required />
    </div>
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
        Lost Password?
      </a>
    </div>
    <div className="w-full">
      <Button onClick={onLoginSubmit}>Log in to your account</Button>
    </div>
    {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?&nbsp;
      <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
        Create account
      </a>
    </div> */}
  </div></div>
  )
}

export default Login