import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddTreatment() {
  const [treatmentName, settreatmentName] = useState('');
  const [msg, setMsg] = useState('');

  const Base_URL = sessionStorage.getItem('Base_URL');
  const emId = sessionStorage.getItem("em_id");
  const navigate = useNavigate();

//   useEffect(() => {
//     const emId = sessionStorage.getItem("em_id");
//     const portalId = sessionStorage.getItem("portal_id");

//     if (emId === "null" || portalId !== "1") {
//       console.log("User not logged in....");
//       navigate("/");
//     }
//   }, []);

  const handleInputChange = (e) => {
    settreatmentName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (treatmentName) {
      setMsg("Submitting Treatment...");
      try {
        const response = await axios.post(`${Base_URL}/addTreatment`, {
          one: treatmentName,
          two: emId,
          authApiKey: "ytfkenaojjawmbjnbsyyj-vhvbs"
        });

        console.log('response', response.data);

        if (response.data === "Success") {
          setMsg(`${treatmentName} treatment Added Successfully.`);
        } else {
          setMsg("Failed to add treatment. Please try again.");
        }
      } catch (error) {
        console.error('Error during treatment submission:', error);
        setMsg("Error occurred. Please try again later.");
      }

      settreatmentName('');
    } else {
      setMsg("Treatment name is required");
    }

    setTimeout(() => {
      setMsg('');
    }, 5000);
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='Addcustom-container'>
      <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={'/adminhome'} className="link-style"><span className="link-text">Home</span></Link>
        <Link to={'/allTreatment'} className="link-style"><i className="bi bi-dot link-icon"></i><span className="link-text">All Treatments</span></Link>
        <span style={{ color: "gray" }}><i className="bi bi-dot"></i>Add Treatment</span>
      </div>

      <p className='ComponentHeading'><i className="bi bi-plus-circle"></i>&nbsp; Add New Treatment</p>
      <hr />

      <div style={{ padding: "10px 20px" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="treatmentName" className='labelText'>
            Add Treatment <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="treatmentName"
            placeholder='Add Treatment Name'
            required
            className="input-field"
            value={treatmentName}
            onChange={handleInputChange}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="custom-btn-primary">Submit</button>
            <button type="button" onClick={handleBackClick} className="custom-btn-secondary">Back</button>
          </div>
          <p className='ShowMsg'>{msg}</p>
        </form>
      </div>
    </div>
  );
}
