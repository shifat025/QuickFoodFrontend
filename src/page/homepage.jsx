import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import FeaturedSection from "../components/Home/FeaturedSection";
import Hero from "../components/Home/Hero";
import { PopularCategories } from "../components/Home/PopularCategories";
import { RestaurantList } from "../components/restuarant/ResturantList";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto">
        <Hero />

        <FeaturedSection />
        <RestaurantList onSelectRestaurant={() => {}} />
        <PopularCategories />
      </div>
      <Footer />
    </div>
  );
}
