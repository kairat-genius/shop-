"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useCallback, useMemo, useState } from "react";
import { reviewsData } from "../../data/reviews.data";
import dynamic from "next/dynamic";

const ReviewGalleryModal = dynamic(
  () => import("../modal/ReviewGalleryModal"),
  {
    ssr: false,
  },
);

interface ReviewModalProps {
  onClose: () => void;
}

const ReviewModal = ({ onClose }: ReviewModalProps) => {
  useBodyScrollLock(true);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Все отзывы, у которых есть изображения
  const reviewsWithImages = useMemo(
    () =>
      reviewsData.filter((review) => review.images && review.images.length > 0),
    [],
  );

  const openGallery = useCallback((reviewIndex: number) => {
    setSelectedIndex(reviewIndex);
    setIsGalleryOpen(true);
  }, []);

  return (
    <Modal onClose={onClose} className="bg-white flex flex-col h-full">
      <div className="flex items-center px-[3.733vw] min-h-[11.733vw] relative">
        <h2 className="flex items-center gap-[1.067vw] font-roboto_condensed leading-[5.067vw] text-[4.8vw] font-bold absolute left-1/2 -translate-x-1/2">
          <span>ОТЗЫВЫ</span>
          <span>(58)</span>
        </h2>
        <Button className="w-[6.4vw] h-[6.4vw]" onClick={onClose}>
          <Icon icon="chevron-right" className="w-full h-full rotate-180" />
        </Button>
      </div>

      <div className="overflow-y-auto">
        <div className="px-[3.733vw] mt-[3.2vw]">
          <div className="flex items-center justify-between p-[3.2vw] rounded-[1.067vw] gap-[3.2vw] w-full bg-[rgba(245,245,249,.6)]">
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
            <div className="flex flex-col gap-[2.133vw] flex-1 w-full items-center justify-center">
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
            </div>
          </div>
        </div>
        <div className="mt-[3.2vw] flex w-full">
          <div className="h-[32vw] overflow-x-auto scrollbar-none">
            <div className="inline-flex items-center gap-[1.067vw] min-w-max px-[3.733vw]">
              {reviewsWithImages.map((review, reviewIdx) =>
                review.images.map((image, imgIdx) => (
                  <img
                    key={`${review.username}-${review.date}-${imgIdx}`}
                    className="h-[32vw] w-[24vw] object-cover cursor-pointer"
                    src={image}
                    alt={`Фото от ${review.username}`}
                    onClick={() => openGallery(reviewIdx)}
                  />
                )),
              )}
            </div>
          </div>
        </div>
        <div className="px-[3.733vw]">
          <div className="py-[3.2vw] flex">
            <Icon
              icon="shield-check"
              className="text-[#01C2C3] w-[4.267vw] h-[4.267vw]"
            />
            <div className="ml-[.533vw] text-slate-500 text-[3.467vw] leading-[normal]">
              Опираясь на передовые алгоритмы и экспертную оценку, мы
              представляем вам достоверные и действенные отзывы.
            </div>
          </div>
        </div>
        <div className="h-[2.133vw] bg-slate-100" />
        <div className="px-[3.733vw]">
          {reviewsData.slice(0, 10).map((item, index) => (
            <div key={index} className="py-[3.2vw] border-b border-slate-100">
              <div className="cOT">
                <div className="flex items-center gap-[3.2vw] mb-[2.133vw]">
                  <div className="flex items-center gap-[3.2vw] flex-1">
                    <div className="flex items-center">
                      <img
                        className="w-[5.867vw] h-[5.867vw] mr-[1.067vw]"
                        src={item.avatar}
                        alt=""
                      />
                      <span className="text-[2.933vw] leading-[normal]">
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
                  <span className="text-[2.933vw] text-slate-500">
                    {item.date}
                  </span>
                </div>
                <div className="mt-[1.067vw] font-light text-[2.667vw] leading-[normal] text-slate-500">
                  <span>Размер: 39 RU (40 EU)</span>
                  <span>, </span>
                  <span>Цвет: Розовый</span>
                </div>
                <div className="mt-[3.2vw] leading-[3.733vw] font-light text-[3.2vw]">
                  Очень удобные кроссовки, после двух проведенных тренировок
                  никаки минус у кроссовок не обнаружено
                </div>
                <div className="mt-[2.133vw] flex flex-wrap gap-x-[2.133vw] gap-y-[3.2vw] text-[2.667vw] leading-[normal] text-slate-500">
                  <div>Соответствие размеру: В размер</div>
                </div>
              </div>
              <div className="mt-[3.2vw] grid grid-cols-3 gap-px">
                {item.images.map((img, imgindex) => (
                  <img src={img} key={imgindex} alt="" className="w-[30.667vw] h-[30.667vw] object-cover"/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isGalleryOpen && reviewsWithImages.length > 0 && (
        <ReviewGalleryModal
          onClose={() => setIsGalleryOpen(false)}
          reviews={reviewsWithImages}
          initialIndex={selectedIndex}
        />
      )}
    </Modal>
  );
};

export default ReviewModal;
