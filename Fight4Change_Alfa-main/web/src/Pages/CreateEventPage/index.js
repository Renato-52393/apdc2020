//create routes page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/PageHeaders';
import {homeObjOne} from '../../Components/PageHeaders/data';
import Navbar from '../../Components/NavbarHome';
import Sidebar from '../../Components/SideBarHome';
import Map from '../../Components/Maps/maps';


const CreateR = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)

        }

    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          <InfoSection {...homeObjOne}/> 
          <Map/>
          <Footer/>
        </>
    )
}

export default CreateR
