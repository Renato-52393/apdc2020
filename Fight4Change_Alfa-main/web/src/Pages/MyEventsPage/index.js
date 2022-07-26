//create events page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/PageHeaders';
import {homeObjFive } from '../../Components/PageHeaders/data';
import Navbar from '../../Components/NavbarHome';
import Sidebar from '../../Components/SideBarHome';
import MyEvents from '../../Components/JoinEventsComp/joinEvents';
const MyEventsPage = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)
        }

    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          <InfoSection {...homeObjFive}/> 
          <MyEvents/> 
          <Footer/>
        </>
    )
}

export default MyEventsPage