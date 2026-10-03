import type { DetailTextModuleType } from "@/types/product-detail.type";


interface DescriptionProps {
  detailTextModule: DetailTextModuleType;
}

const Description = ({ detailTextModule }: DescriptionProps) => {
  return (
    <div className="px-[3.733vw] pt-[2.667vw] pb-[3.2vw]">
      <h2 className="text-[4.8vw] leading-[5.6vw] font-bold font-roboto_condensed">
        {detailTextModule.title}
      </h2>
      {detailTextModule.detailTextList.map((item, index) => (
        <div className="mt-[2.667vw]" key={index}>
          <div className="mb-[1.067vw] font-medium text-[3.733vw] leading-[100%]">
            {item.subTitle}
          </div>
          <p className="text-[3.2vw] leading-[3.733vw] font-light">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Description;
