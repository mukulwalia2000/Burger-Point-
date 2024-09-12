import React from "react";
import {AiFillInstagram,AiFillYoutube,AiFillGithub,AiFillLinkedin} from "react-icons/ai"

const Footer =()=>{
    return (
        <footer>
            <div>
                <h2>Burger Point</h2>

                <p>We are trying to give you the best taste possible.</p>
                <br />

                <em>We give attention to genuine feedback.</em>

                <strong>All right received @burgerpoint</strong>
            </div>

            <aside>
                <h4>Follow Us</h4>

                <a href="https://youtube.com/@mukulwalia8290">
                <AiFillYoutube/>
                </a>
                <a href="https://instagram.com/mukul_walia2000">
                <AiFillInstagram/>
                </a>
                <a href="https://github.com/mukulwalia2000">
                <AiFillGithub/>
                </a>
                <a href="https://linkedin.com/mukul-walia2000">
                <AiFillLinkedin/>
                </a>
            </aside>
        </footer>
    );
}

export default Footer;