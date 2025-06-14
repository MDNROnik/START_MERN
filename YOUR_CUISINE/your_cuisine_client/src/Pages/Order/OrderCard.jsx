import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import EachItem from "./EachItem";
const OrderCard = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div className="w-full my-5 px-4 md:px-10 lg:px-20">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {/* Optional: Split items into multiple slides if needed */}
        <SwiperSlide>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <EachItem key={item._id} item={item} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OrderCard;
