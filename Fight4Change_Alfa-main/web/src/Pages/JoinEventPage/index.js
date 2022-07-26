//create events page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/PageHeaders';
import {homeObjTwo } from '../../Components/PageHeaders/data';
import Navbar from '../../Components/NavbarHome';
import Sidebar from '../../Components/SideBarHome';
import EventsFilters from '../../Components/JoinEventsComp/filter';
import JoinEvents from '../../Components/JoinEventsComp/joinEvents';

const JoinEventsPage = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)

        }

    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          <InfoSection {...homeObjTwo}/>  
          <EventsFilters />
          <JoinEvents />
          <Footer/>
        </>
    )
}

export default JoinEventsPage
