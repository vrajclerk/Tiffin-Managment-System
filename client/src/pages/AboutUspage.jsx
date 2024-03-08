import react from 'react';
import HomeLayout from '../layouts/Home.layout';
import Ourteamslider from '../components/Ourteamslider';
import AboutusPara from "../components/AboutusPara";
import Footer from '../components/Footer';
const AboutUspage =()=>{
    return (
        <>
        <AboutusPara/>
        <Ourteamslider/>
        {/* <Footer /> */}
        </>
    );
}
export default HomeLayout(AboutUspage);