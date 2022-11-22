import '../css/Table.css';
import '../css/CreateData.css';
import React, {useState, useEffect, useRef} from 'react';
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { FaPen } from 'react-icons/fa';
import NavbarMenu from '../components/NavbarMenu';
import Validate from '../ValidateInfo';
import PopupForDeleteEmployee from '../components/PopupForDeleteEmployee';


const UpdateData = () => {

    let searchBar = useRef(null);

    const usersCollectionRef = collection(db, "contacts");

    const [users, setUsers ] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState('');

    const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    rank: 'None'
    };

    let nameInput = useRef(null);

    let [values,setValues] = useState(initialFieldValues);

    let [inputValidate, setInputValidate] = useState({});

    const [successful, setSuccessful] = useState(false);

    const [toEditForm, setToEditForm] = useState(false);

    const [IDTransferToEdit, setIDTransferToEdit] = useState();

    const [IDTransferToDelete, setIDTransferToDelete] = useState();

    const [showPopup, setShowPopup] = useState(false);

    
    useEffect(() => {
        if(searchBar.current !== null){
            searchBar.current.focus();
        }
    }, []);


    useEffect(() => {
        if(nameInput.current !== null){
            nameInput.current.focus();
        }
    }, []);


    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getUsers();
    }, []);

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
            setSuccessful(true);
            waitThreeSeconds();
        }
    }


    const waitThreeSeconds = () => {
        setTimeout(() => {
            refreshPage();
        }, 3000)
    };


    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload(false);
        },500)
    };


    const searchToDeleteOrMOdify = (event) => {
        setFilteredUsers(event.target.value)
    };


    let findName = users.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filteredUsers.toString().toLowerCase())
        )
    });


    const editEmployee = (id) => {
        setToEditForm(true);
        let filteredEditUser;
        filteredEditUser = users.filter((element) => element.id === id);
        setValues(filteredEditUser[0]);
        const transferID = id;
        setIDTransferToEdit(transferID);
    };

    const setEditData = () => {
        const userRef = doc(db, "contacts", IDTransferToEdit);
        updateDoc(userRef, {
        fullName: values.fullName,
        mobile: values.mobile,
        email: values.email,
        rank: values.rank
        });
    }


    const deleteEmployee = (id) => {
        setShowPopup(true);
        let filteredDeleteEmployee;
        filteredDeleteEmployee = users.filter((element) => element.id === id);
        const filteredDeleteEmployeeID = filteredDeleteEmployee[0].id
        setIDTransferToDelete(filteredDeleteEmployeeID);
    }


    return (
        <div>
            <NavbarMenu/> 
            { toEditForm ? (
                    <div className="register-form"> 
                        <form className autoComplete="off" onSubmit={handleFormSubmit}>
                            <h1 className="register-text">Employee modofication</h1>
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
                                    <button 
                                    type="submit" 
                                    value="Save" 
                                    className="submit-button" 
                                    onClick={() => {setEditData(users.id)}}>
                                        Data overwrite
                                    </button>
                                </div>        
                                    {successful ? 
                                        <div className="succesful-registration-container">
                                            <div className="succesful-registration-text-container">
                                                <p>Successful Modification</p>
                                            </div> 
                                        </div>
                                    : null}
                        </form>
                    </div>
            ) : (
                    <div className="contacts-container">
                        <div>
                            <h1 className="main-title-text">Contacts</h1>
                                <PopupForDeleteEmployee 
                                    trigger={showPopup} 
                                    setTrigger={setShowPopup} 
                                    employeeIDforDelete={IDTransferToDelete}/>                       
                        </div>
                            <div className="form-group mt-4">
                                <label htmlFor="searchName" className="search-by-name-label-text">Enter which employee you want to edit or delete:</label>
                                <input 
                                    className="form-control-sm" 
                                    id="searchToEdit" 
                                    type="text" 
                                    name="text" 
                                    ref={searchBar} 
                                    value={filteredUsers}
                                    onChange={searchToDeleteOrMOdify}
                                    />
                            </div>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Mobile</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Rank</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete button</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {findName.map((users, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{users.fullName}</td>
                                                    <td>+36{users.mobile}</td>
                                                    <td>{users.email}</td>
                                                    <td>{users.rank}</td>
                                                    <td>
                                                        <button 
                                                            className="edit-user-button" 
                                                            onClick={() => {editEmployee(users.id)}}>
                                                            <FaPen/>
                                                        </button>
                                                    </td>
                                                        <td>
                                                        <button 
                                                            className="delete-user-button" 
                                                            onClick={() => {deleteEmployee(users.id)}}>
                                                            Delete Employee
                                                        </button>
                                                        </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody> 
                                </table>
                            </div>
                    </div>
            )}
        </div>
    )
}

export default UpdateData;
