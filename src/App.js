import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import MainNav from "./components/MainNav";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";
import NewProduct from "./pages/NewProduct";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <div className=" w-full flex">
          <Navbar/>
          <main className="w-full lg:w-4/5 bg-gray-400 h-screen overflow-y-scroll overflow-x-hidden ">
            <MainNav/>
            <Routes>
              <Route path="/" element={<PrivateRoute/>}>
                <Route path="/" element={<Homepage/>}/>
              </Route>
              <Route path="/products" element={<PrivateRoute/>}>
                <Route path="/products" element={<Products/>}/>
              </Route>
              <Route path="/products/add-product" element={<PrivateRoute/>}>
                <Route path="/products/add-product" element={<NewProduct/>}/>
              </Route>
              <Route path="/orders" element={<PrivateRoute/>}>
                <Route path="/orders" element={<Orders/>}/>
              </Route>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
          </main>
        </div>
      </Router>
      <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </>
  );
}

export default App;
