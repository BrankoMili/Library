import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import ContactUs from "./views/ContactUs";
import TermsOfService from "./views/TermsOfService";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Collection from "./collections/Collection";
import BooksContextProvider from "./context/BooksContext";
import SingleProduct from "./products/SingleProduct";
import PrivacyPolicy from "./views/PrivacyPolicy";
import AddBook from "./user_pages/AddBook";
import SigninPage from "./views/SigninPage";
import NotificationContextProvider from "./context/Notification";
import SearchContextProvider from "./context/SearchContext";

function App() {
  return (
    <div className="App">
      <BooksContextProvider>
        <NotificationContextProvider>
          <SearchContextProvider>
            <Router>
              <Navbar />
              <div className="main">
                <Routes>
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/termsofservice" element={<TermsOfService />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route
                    path="/collection/:collectionName"
                    element={<Collection />}
                  />
                  <Route path="/addbook" element={<AddBook />} />
                  <Route path="/login" element={<SigninPage />} />
                  <Route path="/books/:productId" element={<SingleProduct />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
              <Footer />
            </Router>
          </SearchContextProvider>
        </NotificationContextProvider>
      </BooksContextProvider>
    </div>
  );
}

export default App;
