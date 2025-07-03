import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
// import Admin from "./pages/Admin";
// import Masters from "./pages/Masters";
// import Orders from "./pages/Orders";
// import Inventory from "./pages/Inventory";
// import Reports from "./pages/Reports";
// import Billing from "./pages/Billing";
// import Quotation from "./pages/Quotation";
import "./App.css";
import Login from "./pages/Login";
// import ItemNameMaster from "./pages/ItemNameMaster";
// import ItemShapeMaster from "./pages/ItemShapeMaster";
// import AddTreatment from "./pages/AddTreatment";
// import ItemColorMaster from "./pages/ItemColorMaster";
import ItemInward from "./pages/ItemInward";
import SupplierMaster from "./pages/SupplierMaster";
import AddVoucher from "./pages/AddVoucher";
// Agent Portal
import AgentLayout from "./agent/layout/MainLayout";
import AgentDashboard from "./agent/pages/Dashboard";
import AgentAddVoucher from "./agent/pages/AddVoucher";
import PendingRequest from "./pages/PendingRequests";
import AllVouchers from "./agent/pages/AllVouchers";
import AllInward from "./pages/AllInward";
import Logout from "./components/Logout";
import AddDeliveryChallan from "./pages/AddDeliveryChallan";
import AllDeliveryChallan from "./pages/AllDeliveryChallan";
import AllSuppliers from "./pages/AllSuppliers";
import CustomerMaster from "./pages/CustomerMaster";
import AllCustomers from "./pages/AllCustomers";
import AddItemInward from "./pages/AddItemInwardNew";
import AllProducts from "./pages/AllProduct";


  // local Url
 //const Base_URL='http://localhost:5000'  // my local setup
   //const Base_URL = 'http://192.168.0.139:5000' //network server

  // Production url
  const Base_URL='https://midbserver.co.in:5001'

  //Auth api key
  const authApi_Key = "b986ce110c4e7c523882db76b5rft124"

  sessionStorage.setItem('authApiKey', authApi_Key);
  sessionStorage.setItem('Base_URL', Base_URL);
function App() {
  return (
    <BrowserRouter basename="/jewell/">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="item-name-master" element={<ItemNameMaster />} />
          <Route path="item-shape-master" element={<ItemShapeMaster />} />
          <Route path="item-color-master" element={<ItemColorMaster />} />
          <Route path="addTreatment" element={<AddTreatment />} /> */}
          <Route path="item-inward" element={<ItemInward />} />
          <Route path="supplier-master" element={<SupplierMaster />} />
          <Route path="all-suppliers" element={<AllSuppliers />} />
          <Route path="add-voucher" element={<AddVoucher />} />
          <Route path="Pending-req" element={<PendingRequest/>} />
          <Route path="all-inward" element={<AllInward/>} />
          <Route path="add_delChallan" element={<AddDeliveryChallan/>} />
          <Route path="all_delChallan" element={<AllDeliveryChallan/>} />
          <Route path="customer-master" element={<CustomerMaster />} />
          <Route path="all-customers" element={<AllCustomers />} />

          <Route path="addItemInward" element={<AddItemInward />} />
          <Route path="allProduct" element={<AllProducts/>} />

        </Route>

        {/* Agent Routes */}
        <Route path="/agenthome" element={<AgentLayout />}>
          <Route index element={<AgentDashboard />} />
          <Route path="add-voucher" element={<AgentAddVoucher />} />
          <Route path="all-vouchers" element={<AllVouchers />} />
          
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
