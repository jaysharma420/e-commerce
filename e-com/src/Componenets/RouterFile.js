import { BrowserRouter, Routes, Route } from "react-router-dom"
import Logout from "./Logout";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import "../App.css"
import NotFound from "./Page404";
import Protected from "./Protected";
import Search from "./Search";

function RouterFile() {
  return (<div>
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Protected cmp={Home} />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AddProduct" element={<Protected cmp={AddProduct} />} />
        <Route path="/UpdateProduct" element={<Protected cmp={UpdateProduct} />} />
        <Route path="/searchProduct" element={<Protected cmp={Search} />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  </div>)
}

export default RouterFile;