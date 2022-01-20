import React from 'react';
import "./Header.css";
import mylogo from "../../assets/mylogo.png";
function Header() {
    return (
        <>
        <div className="header d-flex justify-content-around flex-wrap">
            <div className="logo-div">
                <img src={mylogo} alt="logo" />
            </div>
            <div className="heading-div">
                <h1 className='text-center'>
                    The Weather App
                </h1>
            </div>
        </div>
            
        </>
    )
}

export default Header
