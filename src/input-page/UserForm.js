import React, { useState } from "react";
import './UserForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const localAddress = 'http://localhost:8000/api/v1/users';
function UserForm() {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the user name and department data
    const userObject = {
      username: userName,
      department: department
    }
    // console.log(userObject);
    axios.post(localAddress, userObject).then((res) => {
      let _id = res.data.data._id;
      localStorage.setItem("userId", _id);
      navigate(`/dashboard/${_id}`);
    });
  };

  return (
    <div className="user-form">
      <div className="form">
        <form className="main-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input type="text" id="department" value={department} onChange={(event) => setDepartment(event.target.value)}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
