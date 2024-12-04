
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarMain from "./components/NavBarMain"; // Componente de navegação
import Home from "./pages/Home/Home";
import DriversRegistration from "./Components/Registers/Drivers Registration/DriversRegistration";
import LacingFine from "./Components/Lacing/Lacing Fine/LacingFine";
import MultaList from "./Components/MultaList/MultaList";
import DriversManagement from "./Components/Manage/Manage drivers/ManageDrivers";
import FineManagement from "./Components/Manage/FineManagement/FineManagement";
import FineManagementAut from "./Components/Manage/FineAutManagement/FineAutManagement";
import LacingFineAut from "./Components/Lacing/Lacing Fine Aut/LacingFineAut";
import RegisterCostCenter from "./Components/Registers/RegisterCostCenter/RegisterCostCenter";
function AppRoutes() {
  return (
    <Router>
     
      <NavBarMain />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<MultaList/>} />
        <Route path="/lacingfine" element={<LacingFine />} />
        <Route path="/lacingfineaut" element={<LacingFineAut />} />
        <Route path="/registerdrivers" element={<DriversRegistration/>} />
        <Route path="/registercostcenter" element={<RegisterCostCenter/>} />
        <Route path="/drivesmanagement" element={<DriversManagement/>} />
        <Route path="/finemanagement" element={<FineManagement/>} />
        <Route path="/finemanagementaut" element={<FineManagementAut/>} />
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
