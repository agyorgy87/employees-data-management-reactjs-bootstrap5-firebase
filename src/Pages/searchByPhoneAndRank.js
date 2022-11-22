import '../css/Table.css';
import React, {useState, useEffect, useRef} from 'react';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import NavbarMenu from '../components/NavbarMenu';

const Contacts = () => {

    const telenorRef = useRef(null);

    const telekomRef = useRef(null);

    const vodafoneRef = useRef(null);

    const juniorRef = useRef(null);

    const mediorRef = useRef(null);
    
    const seniorRef = useRef(null);

    const usersCollectionRef = collection(db, "contacts");

    const [users, setUsers] = useState([]);

    const [visibleUsers, setVisibleUsers] = useState([]);

    const [telenorEmployees, setTelenorEmployees] = useState(0);

    const [telekomEmployees, setTelekomEmployees] = useState(0);

    const [vodafoneEmployees, setVodafoneEmployees] = useState(0);

    const [juniorEmployees, setJuniorEmployees] = useState(0);

    const [mediorEmployees, setMediorEmployees] = useState(0);

    const [seniorEmployees, setSeniorEmployees] = useState(0);

    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        setVisibleUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getUsers();
    }, []);


    useEffect(() => {
        let allTelenorEmployees = [];
        allTelenorEmployees = users.filter((element) => element.mobile.startsWith("2"));
        setTelenorEmployees(allTelenorEmployees.length)
    })

    useEffect(() => {
        let allTelekomEmployees = [];
        allTelekomEmployees = users.filter((element) => element.mobile.startsWith("3"));
        setTelekomEmployees(allTelekomEmployees.length)
    })

    useEffect(() => {
        let allVodafoneEmployees = [];
        allVodafoneEmployees = users.filter((element) => element.mobile.startsWith("7"));
        setVodafoneEmployees(allVodafoneEmployees.length)
    })

    useEffect(() => {
        let allJuniorEmployees = [];
        allJuniorEmployees = users.filter((element) => element.rank === "junior");
        setJuniorEmployees(allJuniorEmployees.length)
    })

    useEffect(() => {
        let allMediorEmployees = [];
        allMediorEmployees = users.filter((element) => element.rank === "medior");
        setMediorEmployees(allMediorEmployees.length)
    })

    useEffect(() => {
        let allSeniorEmployees = [];
        allSeniorEmployees = users.filter((element) => element.rank === "senior");
        setSeniorEmployees(allSeniorEmployees.length)
    })


    const phoneServiceFilter = () => {
        let filteredList = [];
        let filteredListOfTheFilteredList = [];
        if(telenorRef.current.checked){ 
            const filteredTelenorNumbers = users.filter((element) => element.mobile.startsWith("2"));
            filteredList.push(...filteredTelenorNumbers);       
        }
        if(telekomRef.current.checked){
            const filteredTelekomNumbers = users.filter((element) => element.mobile.startsWith("3"));
            filteredList.push(...filteredTelekomNumbers);
        }
        if(vodafoneRef.current.checked){
            const filteredVodafoneNumbers = users.filter((element) => element.mobile.startsWith("7"));
            filteredList.push(...filteredVodafoneNumbers);
        }
        if(!telenorRef.current.checked && !telekomRef.current.checked && !vodafoneRef.current.checked){
            filteredList.push(...users);
        }
        if(juniorRef.current.checked){
            const filteredJuniorAndMobileEmployees = filteredList.filter((element) => element.rank === "junior");
            filteredListOfTheFilteredList.push(...filteredJuniorAndMobileEmployees);
        } 
        if(mediorRef.current.checked){
            const filteredMediorAndMobileEmployees = filteredList.filter((element) => element.rank === "medior");
            filteredListOfTheFilteredList.push(...filteredMediorAndMobileEmployees)
        }  
        if(seniorRef.current.checked){
            const filteredSeniorAndMobileEmployees = filteredList.filter((element) => element.rank === "senior");
            filteredListOfTheFilteredList.push(...filteredSeniorAndMobileEmployees)
        }
        if(filteredListOfTheFilteredList.length !== 0){
            setVisibleUsers(filteredListOfTheFilteredList);
        }else{
            console.log(filteredList);
            setVisibleUsers(filteredList);
        }      
    }

    return (
        <div>
            <NavbarMenu/>
                <div className="contacts-container">
                    <div>
                        <h1 className="main-title-text">Contacts</h1>
                    </div>
                    <div className="mt-4">
                        <h3 className="filter-title">Search By Mobile Service:</h3>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" id="telenor" 
                                    value="telenor" 
                                    ref={telenorRef} 
                                    onChange={phoneServiceFilter}/>
                                <label className="form-check-label" htmlFor="telenor">Telenor ({telenorEmployees})</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" id="telekom" 
                                    value="telekom" ref={telekomRef} 
                                    onChange={phoneServiceFilter}/>
                                <label className="form-check-label" htmlFor="telekom">Telekom ({telekomEmployees})</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="vodafone" 
                                    value="vodafone" 
                                    ref={vodafoneRef} 
                                    onChange={phoneServiceFilter}/>
                                <label className="form-check-label" htmlFor="vodafone">Vodafone ({vodafoneEmployees})</label>
                            </div>                    
                            <div className="mt-3">
                                <h3 className="filter-title">Search By Rank:</h3>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="junior" 
                                            value="junior" 
                                            ref={juniorRef} 
                                            onChange={phoneServiceFilter}/>
                                        <label className="form-check-label" htmlFor="junior">Junior ({juniorEmployees}) </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="medior" 
                                            value="medior" 
                                            ref={mediorRef} 
                                            onChange={phoneServiceFilter}/>
                                        <label className="form-check-label" htmlFor="medior">Medior ({mediorEmployees})</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="senior" 
                                            value="senior" 
                                            ref={seniorRef} 
                                            onChange={phoneServiceFilter}/>
                                        <label className="form-check-label" htmlFor="senior">Senior ({seniorEmployees})</label>
                                    </div>
                            </div>
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
                                {visibleUsers.map((users, index) => {
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

export default Contacts;