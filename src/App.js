import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collections from "./views/Collections";
import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import ContactUs from "./views/ContactUs";
import TermsOfService from "./views/TermsOfService";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Kids from "./views/Kids";
import Teens from "./views/Teens";
import BooksContextProvider from "./context/BooksContext";
import SingleProduct from "./products/SingleProduct";
import PrivacyPolicy from "./views/PrivacyPolicy";

function App() {
  return (
    <div className="App">
      <BooksContextProvider>
        <Router>
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="/collections" element={<Collections />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/teens" element={<Teens />} />
              <Route path="/books/:productId" element={<SingleProduct />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </BooksContextProvider>
    </div>
  );
}

export default App;
