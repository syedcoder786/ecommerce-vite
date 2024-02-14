import { Avatar, Dropdown } from 'flowbite-react';
import { Button, Checkbox, Label, Modal, TextInput, Tabs } from 'flowbite-react';
import { useRef, useState, useEffect } from 'react';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../store/auth/authSlice';

const Navbar = () => {

  const [openModal, setOpenModal] = useState(false);
  // const emailInputRef = useRef(null);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(logout())
  // },[])

  useEffect(() => {

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  return (
    <div className='md:mb-20 mb-24'>
    <div className='flex justify-between bg-slate-700 gap-3 px-4 py-3 text-white items-center fixed top-0 w-full z-10'>
      <h1 className='text-lg'>Logo Tech.</h1>
      <ul className='flex gap-5'>
        <li className='cursor-pointer'>Home</li>
        <li className='cursor-pointer'>About</li>
        <li className='cursor-pointer'>Contact</li>
      </ul>
      {/* <img  className='w-8 rounded-full cursor-pointer' src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' alt=''/> */}
      

    {
      user?(
        <Dropdown
          label={<Avatar alt="User settings" img="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" rounded />}
          arrowIcon={false}
          inline
          // className='text-black'
        >
          <Dropdown.Header className='w-40'>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => { 

            setOpenModal(false)
            dispatch(logout()) 
            
            }}>Sign out</Dropdown.Item>
        </Dropdown>
      ):(
        <>
        <Button onClick={() => setOpenModal(true)}>Login</Button>
        <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} 
        // initialFocus={emailInputRef}
        >
          <Modal.Header />
          <Modal.Body>
          <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title="Login">
              <Login openModal={openModal} setOpenModal={setOpenModal}/>
            </Tabs.Item>
            <Tabs.Item title="SignUp">
              <Signup openModal={openModal} setOpenModal={setOpenModal}/>
            </Tabs.Item>
          </Tabs>
            
          </Modal.Body>
        </Modal>
        </>
      )
    }
    
    </div>
    </div>
  )
}

export default Navbar