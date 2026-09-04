interface DescriptionProps {
  detailTextModule: {
    detailTextList: {
      generalType: string;
      subTitle: string;
      imgEvenTrace: string;
      content: string;
    }[];
    title: string;
  };
}

const Description = ({ detailTextModule }: DescriptionProps) => {
  console.log("Description detailTextModule:", detailTextModule);
  return (
    <div className="mt-10">
      <h2 className="text-[24px] leading-[100%] font-bold font-roboto_condensed">
        {detailTextModule.title}
      </h2>
      {detailTextModule.detailTextList.map((item, index) => (
        <div className="mt-5" key={index}>
          <div className="mb-1 font-extrabold text-[16px] leading-5">
            {item.subTitle}
          </div>
          <p className="text-[14px] leading-5">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Description;
