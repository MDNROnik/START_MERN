import Banner from "./Banner";
import Featured from "./Featured";
import HomeCategory from "./HomeCategory";
import HomeMenu from "./HomeMenu";
import Testimonials from "./Testimonials";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeCategory></HomeCategory>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
