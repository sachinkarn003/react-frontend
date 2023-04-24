import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from './input-page/UserForm.js';
import Dashboard from './dashboard/Dashboard';
import LeaveForm from './Leave-form/LeaveForm';
import Header from './header/Header';
// import Tested from './Tested';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <h1 className='heading'>Welcome To Leave System</h1>
            </>
          } />
          <Route path="/form-page" element={<UserForm />} />
          <Route path="/dashboard/:_id" element={<Dashboard />} />
          <Route path="/leave-form" element={<LeaveForm />} />
          {/* <Route path="/testing" element={<Tested />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
