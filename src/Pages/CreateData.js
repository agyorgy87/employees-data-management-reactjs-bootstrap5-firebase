import '../css/CreateData.css';
import React, {useState, useEffect, useRef} from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";
import Validate from '../ValidateInfo';

const CreateData = () => {

    let navigate = useNavigate();

    const initialFieldValues = {
        fullName: '',
        mobile: '',
        email: '',
        rank: 'None'
    }

    let nameInput = useRef(null);

    let [values,setValues] = useState(initialFieldValues);

    let [inputValidate, setInputValidate] = useState({});

    const usersCollectionRef = collection(db, "contacts");

    const [successful, setSuccessful] = useState(false);


    useEffect(() => {
        nameInput.current.focus();
    }, [])


    const handleInputChange = (e) => {
    let {name, value} = e.target
    setValues({
        ...values,
        [name]:value
    })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        let ValidateErrors = Validate(values);
        if(ValidateErrors.error === true) {
            setInputValidate(ValidateErrors)
        } else if(ValidateErrors.error === false){
            createData()
    }
    }


    const createData = () => {
        setSuccessful(true)
        addDoc(usersCollectionRef, values);
        waitThreeSeconds()
    }


    const waitThreeSeconds = () => {
        setTimeout(() => {
            navigate("/searchbynameoremail");
    }, 3000)
    }

    return (
        <div>  
            <NavbarMenu/>
                <div className="register-form"> 
                    <form className autoComplete="off" onSubmit={handleFormSubmit}>
                        <h1 className="register-text">Register New Employee</h1>
                            <div className="form-group mt-5">
                                <input 
                                    className={`form-control ${inputValidate.fullName ? 'invalid' : ''}`}
                                    placeholder="Name" 
                                    name="fullName" 
                                    id="fullName"
                                    value={values.fullName}
                                    onChange={handleInputChange}
                                    ref={nameInput}
                                    />
                            </div>
                            {inputValidate.fullName ? <p className="invalid-data-text">{inputValidate.fullName}</p> : null}
                            <div className="form-group mt-4">               
                                    <div className="input-group">
                                        <span className="input-group-text" id="mobile">+36</span>
                                            <input 
                                                className={`form-control ${inputValidate.mobile ? 'invalid' : ''}`} 
                                                placeholder="Mobile number" 
                                                name="mobile" 
                                                id="mobile" 
                                                value={values.mobile}
                                                onChange={handleInputChange}
                                                />
                                    </div>
                            </div>
                            {inputValidate.mobile ? <p className="invalid-data-text">{inputValidate.mobile}</p> : null}
                            <div className="form-group mt-4">
                                <input 
                                    className={`form-control ${inputValidate.email ? 'invalid' : ''}`} 
                                    placeholder="Email" 
                                    name="email" 
                                    id="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    />
                            </div>
                            {inputValidate.email ? <p className="invalid-data-text">{inputValidate.email}</p> : null}
                            <div className="form-group mt-4">
                                <select
                                    className={`form-select ${inputValidate.rank ? 'invalid' : ''}`} 
                                    placeholder="Rank" 
                                    name="rank" 
                                    id="rank"
                                    value={values.rank}
                                    onChange={handleInputChange}
                                    >
                                <option value="None">Select the rank of employee</option>
                                <option value="junior">Junior</option>
                                <option value="medior">Medior</option>
                                <option value="senior">Senior</option>
                                </select>
                            </div>
                            {inputValidate.rank ? <p className="invalid-data-text">{inputValidate.rank}</p> : null}
                            <div className="form-button-container mb-4">
                                <button type="submit" value="Save" className="submit-button">Registration</button>
                            </div>           
                            {successful ? 
                            <div className="succesful-registration-container">
                                <div className="succesful-registration-text-container">
                                    <p>Successful Registration</p>
                                </div> 
                            </div>
                            : null}
                    </form>
                </div>
        </div>
    )
}

export default CreateData;
