import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <AuthProvider>
    // <main>
    //   <Router>
    //     <Navbar />
    //     <Routes>
    //       {/* <Route path="/" element={<Home />} /> */}
    //       {/* <Route path="/edit-room/:roomId" element={<EditRoom />} /> */}
    //       <Route path="/existing-rooms" element={<ExistingRooms />} />
    //       <Route path="/add-room" element={<AddRoom />} />
    //     </Routes>
    //   </Router>
    // </main>
    // </AuthProvider>
    <>
      <AddRoom />
      <ExistingRooms />
    </>
  );
}

export default App;
