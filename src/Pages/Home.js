import React from 'react';
import '../css/Home.css';
import { useNavigate } from "react-router-dom";
import { FaRegAddressCard } from 'react-icons/fa';

const Home = () => {

let navigate = useNavigate();

    return (
        <div className="homeMain">
            <div className="welcomeBox">
                <p className="welcomeTitle">Welcome</p>
                    <div className="welcomeLogo">
                        <div>
                            <h1 className="IconStyle"><FaRegAddressCard/></h1>
                        </div>
                        <div>
                            <p className="welcomeTextTitle">Employee Database</p>
                        </div>
                    </div>
            </div>
                <div className="buttonsForPages">
                    <button 
                        type="button" 
                        className="createDataButton" 
                        onClick={() => {navigate("/createdata");}}
                        >Registration</button>
                        <button 
                        type="button" 
                        className="existingData"
                        onClick={() => {navigate("/searchbynameoremail");}}
                        >Database
                    </button>
                </div>
        </div>   
    )
}

export default Home;