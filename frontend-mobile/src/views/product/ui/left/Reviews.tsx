"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { reviewsData } from "../../data/reviews.data";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

const ReviewGalleryModal = dynamic(
  () => import("../modal/ReviewGalleryModal"),
  {
    ssr: false,
  },
);

const ReviewModal = dynamic(() => import("../modal/ReviewModal"), {
  ssr: false,
});

const Reviews = () => {
  const [isModalGalleryOpen, setIsModalGalleryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // индекс в массиве отзывов с фото

  // Все отзывы, у которых есть изображения (полный список для модалки)
  const reviewsWithImages = useMemo(
    () =>
      reviewsData.filter((review) => review.images && review.images.length > 0),
    [],
  );

  // Первые 6 отзывов с фото для галереи на странице
  const galleryPreviews = useMemo(
    () => reviewsWithImages.slice(0, 6),
    [reviewsWithImages],
  );

  // Открыть модалку с прокруткой к выбранному отзыву
  const openGallery = useCallback(
    (review: (typeof reviewsWithImages)[number]) => {
      const idx = reviewsWithImages.findIndex(
        (r) => r.username === review.username && r.date === review.date,
      );
      if (idx !== -1) {
        setSelectedIndex(idx);
        setIsModalGalleryOpen(true);
      }
    },
    [reviewsWithImages],
  );

  // Открытие без скролла (для "Ещё" и подобных)
  const openGalleryWithoutScroll = useCallback(() => {
    setSelectedIndex(-1);
    setIsModalGalleryOpen(true);
  }, []);

  return (
    <section className="mt-[3.2vw] bg-white">
      <div className="px-[3.733vw]">
        <Button
          className="justify-between gap-5 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-[1.6vw] font-roboto_condensed font-bold leading-[5.624vw] text-[4.8vw]">
            <h2 className=" leading-[5.6vw]">ОТЗЫВЫ</h2>
            <span>(37)</span>
          </div>
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </Button>
        <div className="flex items-center justify-between mt-[3.2vw] p-[3.2vw] rounded-[1.067vw] gap-[3.2vw] w-full bg-[rgba(245,245,249,.6)]">
          <div className="w-[27.733vw] flex flex-col items-center">
            <div className="text-[6.4vw] font-bold leading-[7.467vw] font-roboto_condensed">
              5,0
            </div>
            <div className="mt-[1.067vw] flex gap-[1.067vw] items-center justify-center">
              <div className="flex gap-[1.067vw] items-center">
                <Icon icon="star" className="w-[3.2vw] h-[3.2vw]" />
                <Icon icon="star" className="w-[3.2vw] h-[3.2vw]" />
                <Icon icon="star" className="w-[3.2vw] h-[3.2vw]" />
                <Icon icon="star" className="w-[3.2vw] h-[3.2vw]" />
                <Icon icon="star" className="w-[3.2vw] h-[3.2vw]" />
              </div>
              <Icon
                icon="circle-question-mark"
                className="w-[3.2vw] h-[3.2vw] text-slate-500"
              />
            </div>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex-col gap-[2.133vw] flex-1 w-full"
          >
            <div className="flex items-center gap-[1.067vw] text-[2.933vw] text-slate-500 leading-[3.467vw] w-full">
              <div className="max-w-[21.333vw] w-full truncate text-left">
                Маломерит
              </div>
              <div className="rounded-[.533vw] h-[1.067vw] relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-[.533vw] absolute left-0 h-[1.067vw]"
                  style={{ width: "11%" }}
                />
              </div>
              <div className="w-[7.467vw] text-right shrink-0">11%</div>
            </div>
            <div className="flex items-center gap-[1.067vw] text-[2.933vw] text-slate-500 leading-[3.467vw] w-full">
              <div className="max-w-[21.333vw] w-full truncate text-left">
                В размер
              </div>
              <div className="rounded-[.533vw] h-[1.067vw] relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-[.533vw] absolute left-0 h-[1.067vw]"
                  style={{ width: "89%" }}
                />
              </div>
              <div className="w-[7.467vw] text-right shrink-0">89%</div>
            </div>
            <div className="flex items-center gap-[1.067vw] text-[2.933vw] text-slate-500 leading-[3.467vw] w-full">
              <div className="max-w-[21.333vw] w-full truncate text-left">
                Большемерит
              </div>
              <div className="rounded-[.533vw] h-[1.067vw] relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-[.533vw] absolute left-0 h-[1.067vw]"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="w-[7.467vw] text-right shrink-0">0%</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="pb-[5.333vw] mt-[3.2vw] flex w-full">
        <div className="h-[32vw] overflow-x-auto scrollbar-none">
          <div className="inline-flex items-center gap-[1.067vw] min-w-max px-[3.733vw]">
            {galleryPreviews.map((review) => (
              <img
                key={review.username + review.date}
                className="h-[32vw] w-[24vw] object-cover cursor-pointer"
                src={review.images[0]}
                alt={`Фото от ${review.username}`}
                onClick={() => openGallery(review)}
              />
            ))}
            <div
              className="px-[3.2vw] flex items-center gap-[.533vw] shrink-0"
              onClick={openGalleryWithoutScroll}
            >
              <Icon icon={"arrow-left"} className="w-[3.2vw] h-[3.2vw]" />
              <div className="text-[3.467vw] leading-[normal]">Ещё</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[3.733vw] space-y-[3.2vw]">
        {reviewsData.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="pb-[3.2vw]"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center gap-[3.2vw] mb-[2.133vw]">
              <div className="flex items-center gap-[3.2vw] flex-1">
                <div className="flex items-center">
                  <img
                    className="w-[3.733vw] h-[3.733vw] mr-[1.067vw]"
                    src={item.avatar}
                    alt=""
                  />
                  <span className="text-[2.933vw] leading-[3.733vw] text-slate-500">
                    {item.username}
                  </span>
                </div>
                <div className="flex gap-[1.067vw]">
                  <Icon
                    icon="star"
                    className="w-[3.2vw] h-[3.2vw] text-slate-500"
                  />
                  <Icon
                    icon="star"
                    className="w-[3.2vw] h-[3.2vw] text-slate-500"
                  />
                  <Icon
                    icon="star"
                    className="w-[3.2vw] h-[3.2vw] text-slate-500"
                  />
                  <Icon
                    icon="star"
                    className="w-[3.2vw] h-[3.2vw] text-slate-500"
                  />
                  <Icon
                    icon="star"
                    className="w-[3.2vw] h-[3.2vw] text-slate-500"
                  />
                </div>
              </div>
              <span className="text-[2.933vw] leading-[3.437vw] text-slate-500">
                {item.date}
              </span>
            </div>
            <div className="mt-[1.067vw] text-[2.667vw] leading-[normal] font-light truncate text-slate-500">
              Размер: 39 RU (40 EU), Цвет: Розовый
            </div>
            <div className="mt-[3.2vw]">
              <div className="overflow-hidden">
                <span className="text-[3.2vw] leading-[3.733vw] font-light line-clamp-2">
                  {item.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalGalleryOpen && reviewsWithImages.length > 0 && (
        <ReviewGalleryModal
          onClose={() => setIsModalGalleryOpen(false)}
          reviews={reviewsWithImages}
          initialIndex={selectedIndex}
        />
      )}

      {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default Reviews;
