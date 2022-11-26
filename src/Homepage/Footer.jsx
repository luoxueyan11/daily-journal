import React from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaTwitterSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaWhatsappSquare } from 'react-icons/fa'
import './Footer.css'

class Footer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className = 'footer'>
                <div className = 'footer-limiter'>
                    <div className = 'footer-left'>
                        <p className = 'footer-links'> JOURNAL</p>
                        <p> RECORD LIFE & MAKE LIKE-MINDED FRIENDS</p>
                        <p>© 2022. IT5007-XLS. All rights reserved.</p>
                    </div>
                    <div className = 'footer-right'>
                        <FaFacebookSquare className = 'icon'  size = {35} />
                        <FaTwitterSquare className = 'icon' size = {35}/>
                        <FaLinkedin className = 'icon' size = {35}/>
                        <FaWhatsappSquare className = 'icon' size = {35}/>
                        <p></p>
                        <p>Tel: +65 1234 5678<br></br>Email: XLS@gmail.com</p>
                    </div>
                </div>
            </div>




        )
    }


}

export default Footer