import { Carousel } from "flowbite-react";
import ShowProducts from "./components/ShowProducts";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 m-2">
        <Carousel slideInterval={5000}>
          <img
            src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/04/ecommerce3-1.jpg"
            alt="..."
          />
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*34GfkhLFydPjZWUde1EzRg.jpeg"
            alt="..."
          />
          <img
            src="https://www.lebujutsu.net/wp-content/uploads/2022/09/F36EE1D3-min.jpg"
            alt="..."
          />
          <img
            src="https://www.insightssuccess.in/wp-content/uploads/2020/12/785054-ecommerce-istock-020119.jpg"
            alt="..."
          />
          <img
            src="https://dashtechinc.com/wp-content/uploads/2020/02/E-Commerce-in-our-daily-life.jpg"
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
