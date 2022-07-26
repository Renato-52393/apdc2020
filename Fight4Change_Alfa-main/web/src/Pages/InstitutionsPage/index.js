//home page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/PageHeaders';
import {homeObjFour } from '../../Components/PageHeaders/data';
import Navbar from '../../Components/NavbarHome'
import Sidebar from '../../Components/SideBarHome';
import InstitutionsInfo from '../../Components/InstitutionsComp/data'


const InstitutionsP = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)

        }

    return (
        <>        
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          <InfoSection {...homeObjFour}/>   
          <InstitutionsInfo/> 
          <Footer/>
        </>
    )
}

export default InstitutionsP
