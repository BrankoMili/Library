import "./App.css";
import instance from "./utils/api";
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
        <div className="main">
          <Routes>
            <Route path="/collections" element={<Collections />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/teens" element={<Teens />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
