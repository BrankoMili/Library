import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import ContactUs from "./views/ContactUs";
import TermsOfService from "./views/TermsOfService";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Kids from "./collections/Kids";
import Teens from "./collections/Teens";
import BooksContextProvider from "./context/BooksContext";
import SingleProduct from "./products/SingleProduct";
import PrivacyPolicy from "./views/PrivacyPolicy";
import AddBook from "./user_pages/AddBook";
import SigninPage from "./views/SigninPage";

function App() {
  return (
    <div className="App">
      <BooksContextProvider>
        <Router>
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/teens" element={<Teens />} />
              <Route path="/addbook" element={<AddBook />} />
              <Route path="/login" element={<SigninPage />} />
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
