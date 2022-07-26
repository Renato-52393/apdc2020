
import React, { useState } from 'react'
import Footer from '../../Components/Footer';
import Form from '../../Components/Profile';
import Navbar from '../../Components/NavbarHome';
import Sidebar from '../../Components/SideBarHome';


const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)

  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Form />
      <Footer />
    </>
  )
}

export default ProfilePage
