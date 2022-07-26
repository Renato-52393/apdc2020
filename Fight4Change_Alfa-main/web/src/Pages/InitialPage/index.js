//home page

import React, {useState} from 'react'
import Footer from '../../Components/Footer';
import InfoSection from '../../Components/BigHeaders';
import { homeObjAbout, homeObjFight, homeObjTeam, homeObjDiscover} from '../../Components/BigHeaders/data';
import Navbar from '../../Components/NavbarInitial'
import Sidebar from '../../Components/SideBarInitial'

const Home = () => {
        const[isOpen,setIsOpen] = useState(false);

        const toggle = () => {
                setIsOpen(!isOpen)

        }

    return (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle}/>
          <InfoSection {...homeObjFight}/>
          <InfoSection {...homeObjAbout}/>
          <InfoSection {...homeObjDiscover}/>
          <InfoSection {...homeObjTeam}/>       
          
          <Footer/>
        </>
    )
}

export default Home
