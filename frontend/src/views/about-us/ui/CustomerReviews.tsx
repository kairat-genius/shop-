"use client";
import CustomerReviewVideo from "./CustomerReviewVideo";

const videos = [
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/31eaa83d-eec4-5d9f-012e-7a5bf4480c48-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/46006d7d-ac86-9e77-64e6-6ce6f482bd11.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/fc40ee5e-4861-2278-6b44-09dc5a29dbe5-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/6f702f77-92d4-b79b-99b0-a4bcfd9c6988.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/58cc90e2-5709-a000-4e2b-2c185a857d2c-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/bd2ce3c7-9ae7-1701-d382-8bdd06304908.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/e532df71-5257-ae52-68f7-540e77ebd241-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/160836d1-1f70-8549-bc0c-86f05b81a7ef.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/1607e144-a70e-3e57-8cf6-186adf6dfde6-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/84b08f18-84e3-fc52-77d8-2aabdf38e38d.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/5a9eceb2-12af-55d6-58db-4e371538e0c2-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/76755be4-5cb8-6634-609d-b82f462f6e2b.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/9ba6fa26-a215-6512-59f0-e095b479dec3-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/906e219c-8b6a-2d4f-b7ba-c3e5f8b1c952.mp4",
  },
  {
    poster:
      "https://cdn-img.thepoizon.ru/node-common/1ca8bb37-49ff-844b-54af-dcf40586a7b2-1080-1920.png?x-oss-process=image/resize,s_1280/format,webp",
    video:
      "https://h5cdn.dewu.com/app/video/2e0bf0a3-ceb5-8290-6105-5930d69f0694.mp4",
  },
];

const CustomerReviews = () => {
  return (
    <section className="w-[64rem] mx-auto mt-10">
      <h2 className="text-[2.1rem] leading-[2.4rem] font-bold font-roboto_condensed">
        Отзывы наших покупателей
      </h2>
      <div className="gap-4 mt-6 grid grid-cols-[repeat(4,308px)]">
        {videos.map((video) => (
          <CustomerReviewVideo
            key={video.video}
            poster={video.poster}
            video={video.video}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
