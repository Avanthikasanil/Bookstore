// import logo from './logo.svg';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import Home from './pages/Home/Home';
// import Register from './components/RegiterPage/Register';
// import BuyerProduct from './components/BuyerPage/BuyerProducts/BuyProduct';
// import SellerProduct from './components/SellerPage/Sellerproduct/SelProduct';
// import WishlistPage from './components/BuyerPage/BuyerList/BuyerList.jsx';
// import CartPage from './components/BuyerPage/BuyerCart/Cart.jsx';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// function App() {
//   return (
//     <Router>
//       <Routes>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}       // Toast disappears after 3 seconds
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/buyer" element={<BuyerProduct  />} />
//         <Route path="/wishlist" element={<WishlistPage />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/seller" element={<SellerProduct />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from './pages/Home/Home';
import Register from './components/RegiterPage/Register';
import BuyerProduct from './components/BuyerPage/BuyerProducts/BuyProduct';
import SellerProduct from './components/SellerPage/Sellerproduct/SelProduct';
import WishlistPage from './components/BuyerPage/BuyerList/BuyerList';
import CartPage from './components/BuyerPage/BuyerCart/Cart';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buyer" element={<BuyerProduct />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/seller" element={<SellerProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
