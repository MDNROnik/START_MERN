import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../Share/SectionTitle";

const Tesimonials = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    // fetch("http://localhost:5000/review")
    //   .then((res) => res.json())
    //   .then((data) => setReviews(data));

    axiosPublic.get("/review").then((res) => {
      setReviews(res.data);
    });
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        subHeading="What Our Client Say"
        heading={"Testimonials"}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center mx-24 my-16">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="py-8">{review.details}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Tesimonials;
