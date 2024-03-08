import react from 'react';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

const ContactUsPage = (() => {
    return (<>
        <Navbar/>
        <ContactUs />
        <Footer/>
    </>);
        
});
export default ContactUsPage;