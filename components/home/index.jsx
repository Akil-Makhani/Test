import Banner from "./Banner";
import ExploreWorld from "./exploreWorld";
import Hostel from "./hostel";
import OurlatestBlog from "./OurlatestBlog";
import RecentSearch from "./RecentSearch";
import FeaturedHostel from "./FeaturedHostel";
import TravelActivity from "./TravelActivity";
import Buddies from "./Buddies";
import WorldHostel from "./WorldHostel";

const HomeScreen = () => {
  return (
    <>
      <Banner />
      <RecentSearch />
      <ExploreWorld />
      <FeaturedHostel />
      <TravelActivity />
      <Buddies />
      <Hostel />
      <OurlatestBlog />
      <WorldHostel />
    </>
  );
};

export default HomeScreen;
