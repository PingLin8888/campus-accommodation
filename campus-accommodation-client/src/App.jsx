import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Bookings from "./components/bookings/Bookings";
import FindBooking from "./components/bookings/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import LogOut from "./components/auth/LogOut";
import RequireAuth from "./components/auth/RequireAuth";
import { AuthProvider } from "./components/auth/AuthProvider";
import MaintenanceIssuesAdmin from "./components/Maintenance/MaintenanceIssuesAdmin";
import IssueList from "./components/Maintenance/IssueList";
import IssueDetail from "./components/Maintenance/IssueDetail";
import LogIssue from "./components/Maintenance/LogIssue";
import UpdateIssue from "./components/Maintenance/UpdateIssue";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            {/* path attribute in Route is relatively arbitually, as long as you keep consistent with the NavBar component. */}
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add/new-room" element={<AddRoom />} />
            <Route
              path="/book-room/:roomId"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route
              path="/maintenanceIssue"
              element={<MaintenanceIssuesAdmin />}
            />
            <Route path="/issues" element={<IssueList />} />
            <Route path="/issues/:issueId" element={<IssueDetail />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/log-issue" element={<LogIssue />} />
            {/* <Route path="/update-issue" element={<UpdateIssue />} /> */}
            {/* if no issueId here, issueId can't be passed in the UpdateIssue.jsx component. */}
            <Route path="/update-issue/:issueId" element={<UpdateIssue />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  );
}

export default App;
