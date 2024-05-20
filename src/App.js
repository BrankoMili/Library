import "./App.css";
import instance from "./utils/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./views/Collection";
import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import ContactUs from "./views/ContactUs";
import TermsOfService from "./views/TermsOfService";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

function App() {
  // const getBooks = () => {
  //   instance
  //     .get("/book")
  //     .then(res => console.log(res.data))
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  // useEffect(() => {
  //   getBooks();
  // }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/collection" element={<Collection />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
