import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import MainNav from "./components/MainNav";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <div className=" w-full flex">
        <Navbar/>
        <main className="w-full lg:w-4/5 bg-gray-600 h-screen overflow-y-scroll overflow-x-hidden">
          <MainNav/>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
