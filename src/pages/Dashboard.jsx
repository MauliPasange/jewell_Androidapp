import React, {useState, useEffect} from 'react'
import user from '../assets/img/in.png'
import gh from '../assets/img/hg.png'
import inv from '../assets/img/Inv.png'
import invoice from '../assets/img/invoice.png'
import group from '../assets/img/group.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiConfig } from "../../src/config";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
   const Base_URL = apiConfig.getBaseURL();
    const authApiKey = apiConfig.getApiKey();

   useEffect(() => {
    // Call API to get total product count
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${Base_URL}/stone/productsCount`,{
          headers: {
          "x-api-key": authApiKey,
        }
        }); // Change URL as needed
        if (res.data && typeof res.data.count === 'number') {
          setProductCount(res.data.count);
        }
      } catch (err) {
        console.error("Failed to fetch product count:", err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="add-dashboard-container py-4">
     <p style={{fontSize:"22px", fontWeight:"700",marginLeft:"30px", color:"#0986a7"}}><img src={inv} height={40} width={40}></img> WGE INVENTORY REGISTER</p>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5 col-xl-3">
            <Link to={'/addItemInward'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>Add Products</h5>
                {/* <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>5</p> */}
              </div>
              <img src={user} height={50} width={50} alt="Pending" />
            </div>
            </Link>
          </div>
          <div className="col-lg-5 col-xl-3">
             <Link to={'/allProduct'} style={{ textDecoration: 'none', color: 'inherit' }}>
             <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>View Products</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>{productCount}</p>
              </div>
              <img src={invoice} height={50} width={50} alt="Pending" />
            </div>
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
