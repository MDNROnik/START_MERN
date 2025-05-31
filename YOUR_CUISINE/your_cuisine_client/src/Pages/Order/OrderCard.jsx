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
    <div>
      <div>OrderCard {items.length}</div>
      <div>
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="grid md:grid-cols-3 gap-10">
              {items.map((item) => (
                <EachItem key={item._id} item={item}></EachItem>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default OrderCard;
