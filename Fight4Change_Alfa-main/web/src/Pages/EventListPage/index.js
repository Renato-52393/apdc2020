//saved routes page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/PageHeaders';
import {homeObjThree } from '../../Components/PageHeaders/data';
import Navbar from '../../Components/NavbarHome'
import Sidebar from '../../Components/SideBarHome'

const Events = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)

        }

    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          <InfoSection {...homeObjThree}/>    
          <Footer/>
        </>
        
    )
}

export default Events
