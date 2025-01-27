
import {useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
// import ItemDetails from "./scenes/itemDetails/ItemDetails";
// import Checkout from "./scenes/checkout/Checkout";
// import Confirmation from "./scenes/checkout/Confirmation";
// import Navbar from "./scenes/global/Navbar";
// import CartMenu from "./scenes/global/CartMenu";
// import Footer from './scenes/global/Footer';
import { Login, Signup } from './auth';
import Home from './scenes/Home/Home';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      {/* <Navbar/> */}
      {/* <ScrollToTop/> */}
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path = "/sign-up" element={<Signup/>}/>
        <Route path = "/Home" element = {<Home/>}/>
        {/* <Route path="item/:itemId" element={<ItemDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<Confirmation />} /> */}
        
      </Routes>
      {/* <CartMenu/>
      <Footer/> */}
      </BrowserRouter>     
    </div>
  );
}

export default App;