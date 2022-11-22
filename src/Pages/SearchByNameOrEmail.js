import '../css/Table.css';
import React, {useState, useEffect, useRef} from 'react';
import { db } from "../firebaseConfig";
import { collection, getDocs} from "firebase/firestore";
import NavbarMenu from "../components/NavbarMenu";

const SearchByName = () => {

    let searchBar = useRef(null);

    const usersCollectionRef = collection(db, "contacts");

    const [users, setUsers ] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState('');


    useEffect(() => {
        searchBar.current.focus();
    })


    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getUsers();
    }, []);


    const searchNameOrEmail = (event) => {
        setFilteredUsers(event.target.value)
    }


    let findNameOrEmail = users.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filteredUsers.toString().toLowerCase())
    )
    });


    return (
        <div> 
            <NavbarMenu/>
                <div className="contactsTable">
                    <div>
                        <h1 className="mainTitleInTable">Contacts</h1>
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="searchName" className="searchByNameLabelText">Search by Name or Email:</label>
                            <input 
                                className="form-control-sm" 
                                id="searchName" 
                                type="text" 
                                name="text" 
                                ref={searchBar} 
                                value={filteredUsers}
                                onChange={searchNameOrEmail}
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
                                </tr>
                            </thead>
                            <tbody>
                                {findNameOrEmail.map((users, index) => {
                                    return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{users.fullName}</td>                
                                        <td>+36{users.mobile}</td>                
                                        <td>{users.email}</td>
                                        <td>{users.rank}</td>
                                    </tr>
                                );
                                })}
                            </tbody> 
                        </table>
                    </div>
                </div>
        </div>
    )
}

export default SearchByName;