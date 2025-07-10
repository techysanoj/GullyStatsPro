import './Home.css'
import Header from './Header';
import HeroSection from './HeroSection';

const Home = () => {
  return (
    <div className="home-container">
      <Header></Header>
      <HeroSection />
    </div>
  );
};

export default Home;