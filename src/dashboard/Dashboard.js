import React, { useState, useEffect } from "react";
import './Dashboard.css';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const localAddress = 'http://localhost:8000/api/v1/users';
function Dashboard() {
    const { _id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${localAddress}/${_id}`);
            const userInfo = { history: response.data.data.leaveHistory, userData: response.data.data.detail }
            setData(userInfo);
        }
        fetchData();
    }, [_id]);
    // console.log(data);
    if (!data) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className="dashboard-container">
            <h1>Welcome to the Dashboard, {data.userData.username}!</h1>
            <div className="user-info">
                <p>Username: {data.userData.username}</p>
                <p>Department: {data.userData.department}</p>
                <p>Casual Leaves: {data.userData.casualLeaves}</p>
                <p>Sick Leaves: {data.userData.sickLeaves}</p>
            </div>

            <div className="leave-history">
                <h1>Leave History</h1>
                {data.history.length !== 0 ? (
                    data.history.map(((i, index) => (
                        <div key={index}>
                            <p>From Date: {i.fromDate.slice(0, 10)}, to Date: {i.toDate.slice(0, 10)}</p>
                            <p>{i.leaveType === 1 ? 'Casual Leave' : 'Sick Leave'}</p>
                        </div>
                    )))
                ) : (
                    <h3>No History</h3>
                )}

            </div>

            <Link to="/leave-form">
                <div className="leave-button">
                    <button>Apply For Leave</button>
                </div>
            </Link>
        </div>
    )
}

export default Dashboard