import React from 'react';
import '../css/Home.css';
import { useNavigate } from "react-router-dom";
import { FaRegAddressCard } from 'react-icons/fa';

const Home = () => {

let navigate = useNavigate();

    return ( 
        <div className="home-container">
            <div className="welcome-container">
                <p className="welcome-title">Welcome</p>
                    <div className="welcome-logo">
                        <div>
                            <h1 className="Icon-style"><FaRegAddressCard/></h1>
                        </div>
                        <div>
                            <p className="welcome-text-title">Employee Database</p>
                        </div>
                    </div>
            </div>
                <div className="buttons-for-pages">
                    <button 
                        type="button" 
                        className="create-data-button" 
                        onClick={() => {navigate("/createdata");}}
                        >Registration</button>
                        <button 
                        type="button" 
                        className="existing-data-button"
                        onClick={() => {navigate("/searchbynameoremail");}}
                        >Database
                    </button>
                </div>
        </div>   
    )
}

export default Home;