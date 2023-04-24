import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import './LeaveForm.css';

const localAddress = 'http://localhost:8000/api/v1/users';
function LeaveForm() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [department, setDepartment] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [duration, setDuration] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const navigate = useNavigate();
    const userMap = {}; // object to map user _id to display name

    useEffect(() => {
        axios.get(localAddress).then((res) => {
            const userList = res.data.data;
            setUsers(userList);
            userList.forEach((user) => {
                userMap[user._id] = user.name; // map user _id to display name
            });
        });
    }, []);

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        axios.get(`${localAddress}/${event.target.value}`).then((res) => {
            // console.log(res.data.data.detail.department);
            setDepartment(res.data.data.detail.department); // set department based on selected user
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            user: selectedUser,
            leaveType: leaveType,
            fromDate: duration,
            toDate: toDate
        };

        axios.post(`${localAddress}/create-leave`, formData).then((res) => {
            alert('Your Leave Has Granted');
            navigate('/');
        }).catch((error) => {
            alert(error.response.data.errorMessage);
        });
    };

    return (
        <div className="leave-form-container">
            <h1>Leave Application Form</h1>
            <form className='leave-main-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userSelect">Username</label>
                    <select id="userSelect" value={selectedUser} onChange={handleUserChange}>
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="departmentInput">Department</label>
                    <input type="text" id="departmentInput" name="department" value={department} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="leaveType">Leave Type</label>
                    <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value={1}>Casual</option>
                        <option value={2}>Sick</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="duration">From (in days)</label>
                    <DatePicker id="duration" dateFormat="yyyy-MM-dd" selected={duration} onChange={(date) => setDuration(date)} />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">to Date (in days)</label>
                    <DatePicker id="duration" dateFormat="yyyy-MM-dd" selected={toDate} onChange={(date) => setToDate(date)} />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default LeaveForm;
