import routes from '../../Images/Routes.svg'
import insti from '../../Images/Institutions.svg'
import prize from '../../Images/Prizes.svg'


export const homeObjFight = {

    id: 'zero',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'Fight4Change',
    headline: 'We are the future! Join us and fight a for change!',
    description: ' Do you enjoy helping others? Let us help! ',
    description1:'Join an event or create your own. The options are almost limitless. Grasp the bliss of nature with an offroad adventure or share the beautiful places in your hometown, all while making a positive impact on a strangers life!',
    buttonLabel: 'XXXX',
    imgStart: true,
    img: require('../../Images/svg-1.svg').default,
    alt: 'LOGO',
    dark: true,
    primary: true,
    darkText: true
}
export const homeObjAbout = {

    id: 'about',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'About',
    headline: 'We are here to help!',
    description: 'With the nowadays economical situation due mostly to the pandemic we believe this application will enable less fortunate ones to easily have a short break with the help of those who are able to provide whatever they can in this times of need!',
    buttonLabel: 'XXXX',
    imgStart: false,
    img: require('../../Images/team.svg').default,
    alt: 'LOGO',
    dark: true,
    primary: true,
    darkText: true
}

export const homeObjTeam = {

    id: 'team',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'The Team',
    headline: 'IFRAG',
    description: 'We are 5 students of computer science engineering with the ambition of making a difference in the community. This project came with that same intention and determination to try to improve our society’s more current porblems!',
    buttonLabel: 'XXXX',
    imgStart: false,
    img: require('../../Images/team_logo.png').default,
    alt: 'LOGO',
    dark: true,
    primary: true,
    darkText: true
}
export const homeObjDiscover = {

    id: 'discover',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'Discover',
    headline: 'We all have time!',
    description: 'You may think that volunteering is for people who have lots of time to spare but we are here to prove you  wrong! With our mobile app is now easier than ever to pursuit the world we all dream about. If you want you can team up with your friends and embark on an interactive trip around your neibourhood. ',
    buttonLabel: 'XXXX',
    imgStart: true,
    img: require('../../Images/mobile.svg').default,
    alt: 'LOGO',
    dark: true,
    primary: true,
    darkText: true
}

export const homeObjZero = {

    id: 'routes',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'',
    headline: 'Events',
    description: 'Join an event or create your own. The options are almost limitless. Grasp the bliss of nature with an offroad adventure or share the beautiful places in your hometown, all while making a positive impact on a strangers life!',
    buttonLabel: 'XXXX',
    imgStart: true,
    img: routes,
    alt: 'routes',
    dark: true,
    primary: true,
    darkText: true,
    //href: "/events"
}
export const homeObjOne = {

    id: 'inst',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'',
    headline: 'Institutions',
    description: 'Get to know the instituitions available for volunteering in Portugal.',
    buttonLabel: 'XXXX',
    imgStart: false,
    img: insti,
    alt:"inst",
    dark: true,
    primary: true,
    darkText: true,
    //href: "/institutions"
}

export const homeObjTwo = {

    id: 'prizes',
    lightBg: false,
    lightText:true,
    lightTextDesc: true,
    topLine:'',
    headline: 'Prizes',
    description: 'Here you can win more than experience through volunteering.',
    buttonLabel: 'XXXX',
    imgStart: true,
    img: prize,
    alt: 'prizes',
    dark: true,
    primary: true,
    darkText: true,
    //href: "/prizes"
}