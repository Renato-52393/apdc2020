//home page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/BigHeaders';
import {homeObjZero, homeObjOne, homeObjTwo} from '../../Components/BigHeaders/data';
import Navbar from '../../Components/NavbarHome'
import Sidebar from '../../Components/SideBarHome'

const HomeUser = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)

        }
        console.log("<HomeUser "+ localStorage.getItem("user"));

    return (
        <>        
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          
          <InfoSection {...homeObjZero}/>
          <InfoSection {...homeObjOne}/>
          <InfoSection {...homeObjTwo}/>          
          <Footer/>
        </>
    )
}

export default HomeUser
