import React from 'react'
import { Link } from 'react-router-dom'

function footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="about-us">
                    <h2>About Us</h2>
                    <div className="sec"></div>
                    <p>
                        Nguyen Tuan Anh<br />
                        Dang Trong Quoc Huy<br />
                        Nguyen Trung Trien<br />
                        Truong Dieu Tri
                    </p>
                    <ul>
                        <li> <Link to="#"> <i className="fab fa-facebook-square"></i> </Link> </li>
                        <li> <Link to="#"> <i className="fab fa-instagram-square"></i> </Link> </li>
                        <li> <Link to="#"> <i className="fab fa-twitter-square"></i> </Link> </li>
                    </ul>
                </div>

                <div className="quick-link">
                    <h2>Quick Links</h2>
                    <div className="sec"></div>
                    <ul>
                        <li>
                            <Link to="#">About Us</Link>
                        </li>

                        <li>
                            <Link to="#">New Products</Link>
                        </li>

                        <li>
                            <Link to="#">Registration</Link>
                        </li>
                    </ul>
                </div>

                <div className="contact-us">
                    <h2>Contact Us</h2>
                    <div className="sec"></div>
                    <ul>
                        <li> <i className="fas fa-phone-square"></i> +84937498046 </li>
                        <li> <i className="fas fa-map-marked-alt"></i> HCM city, Vietnam </li>
                        <li> <i className="far fa-envelope"></i> quochuy1204fb@gmail.com </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default footer
