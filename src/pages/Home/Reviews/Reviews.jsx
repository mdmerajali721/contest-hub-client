import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// sample data
const reviews = [
  {
    name: "Ariana Rahman",
    role: "Graphic Designer",
    img: "https://i.pravatar.cc/300?img=1",
    text: "ContestHub has taken my creative skills to a whole new level. The design contests are truly challenging!",
    rating: 5,
  },
  {
    name: "Hasiba Rahman",
    role: "University Student",
    img: "https://i.pravatar.cc/300?img=2",
    text: "I won a prize in my very first contest! The platform is super easy to use and well designed.",
    rating: 5,
  },
  {
    name: "Naimul Hasan",
    role: "Content Writer",
    img: "https://i.pravatar.cc/300?img=3",
    text: "The writing contests are exciting, and the judgement process feels very transparent.",
    rating: 5,
  },
  {
    name: "Rafid Khan",
    role: "Photographer",
    img: "https://i.pravatar.cc/300?img=4",
    text: "The photography category is highly competitive—but that’s what makes it fun!",
    rating: 5,
  },
  {
    name: "Sadia Afreen",
    role: "UI/UX Enthusiast",
    img: "https://i.pravatar.cc/300?img=5",
    text: "ContestHub helped me win my first competition. The UI is very clean and smooth.",
    rating: 5,
  },
  {
    name: "Mehedi Hasan",
    role: "Creative Writer",
    img: "https://i.pravatar.cc/300?img=6",
    text: "The task submission system is excellent. Everything works smoothly without any issues.",
    rating: 5,
  },
  {
    name: "Sabbir Chowdhury",
    role: "Business Student",
    img: "https://i.pravatar.cc/300?img=7",
    text: "I learned a lot by joining the idea pitching contest. Highly recommended!",
    rating: 5,
  },
  {
    name: "Tanvir Hossain",
    role: "Freelancer",
    img: "https://i.pravatar.cc/300?img=8",
    text: "The prize distribution is fair, and support responds lightning fast!",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="pt-8 relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-500">
          Creators Reviews
        </h2>
        <p className="mt-6 text-sm text-gray-500 max-w-3xl mx-auto">
          Join thousands of talented people who’ve grown, won, and thrived on
          ContestHub
        </p>
        <div className="mt-6 h-1.5 w-40 mx-auto bg-green-500 rounded-full" />
      </div>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]} // Navigation removed
        breakpoints={{
          640: { slidesPerView: 1.4, spaceBetween: 40 },
          768: { slidesPerView: 2.2, spaceBetween: 50 },
          1024: { slidesPerView: 3, spaceBetween: 60 },
          1280: { slidesPerView: 3.5 },
        }}
        className="reviews-swiper pb-16"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="px-4 py-8">
              <ReviewCard review={review} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;