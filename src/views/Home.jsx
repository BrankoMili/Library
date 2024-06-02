import laptopPhoto from "../assets/laptop-photo.jpg";

const Home = () => {
  return (
    <div className="home_container">
      <h1>Digital Library</h1>
      <h5>
        {" "}
        Explore a vast number of ebooks, audiobooks, articles, and more - all at
        your fingertips.
      </h5>
      <img src={laptopPhoto} alt="laptop_photo" className="laptop_photo" />
      <h3>Most Popular Books</h3>
    </div>
  );
};

export default Home;
