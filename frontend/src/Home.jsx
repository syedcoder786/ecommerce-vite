import { Carousel } from "flowbite-react";
import ShowProducts from "./components/ShowProducts";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 m-2">
        <Carousel slideInterval={5000}>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
      <hr />
      <ShowProducts />
    </div>
  );
};

export default Home;