import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import CreateData from "./Pages/CreateData";
import SearchByNameOrEmail from './Pages/SearchByNameOrEmail';
import SearchByPhoneAndRank from './Pages/searchByPhoneAndRank';
import UpdateData from "./Pages/UpdateData";


function Navigation() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="createdata" element={<CreateData />} />
          <Route path="searchbynameoremail" element={<SearchByNameOrEmail />} />
          <Route path="searchbyphoneandrank" element={<SearchByPhoneAndRank />} />
          <Route path="updatedata" element={<UpdateData />} />
        </Routes>
    </Router>
  );
}

export default Navigation;
