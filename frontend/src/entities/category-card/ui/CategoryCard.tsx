import { LinkButton } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";
import { getImageUrl } from "@/shared/utils/getImageUrl";

interface CategoryCardProps {
  block_image: string;
  name: string;
  slug: string;
  className?: string;
}

const CategoryCard = ({
  block_image,
  name,
  slug,
  className,
}: CategoryCardProps) => {
  return (
    <article
      className={cn("flex items-end justify-center relative", className)}
    >
      <img
        src={getImageUrl(block_image + "?width=320")}
        loading="lazy"
        srcSet={`${getImageUrl(`${block_image}?width=320`)} 320w, ${getImageUrl(`${block_image}?width=490`)} 490w`}
        sizes="(min-width: 1024px) 310px, (min-width: 768px) 550px, calc(50vw - 40px)"
        decoding="async"
        alt={name}
        className="absolute h-full w-full object-cover bg-gray-400"
      />
      <div className="flex flex-col justify-center items-center gap-3.75 relative text-white px-1.25 md:px-2.5 mb-2.5">
        <div className="text-lg md:text-xl lg:text-2xl leading-none md:leading-5.5 lg:leading-6.5 uppercase font-bold text-center">
          {name}
        </div>
        <LinkButton
          className="uppercase px-2.5 md:px-5 border-[1.333px] mb-1.25 md:mb-8.75 py-2 md:py-3 w-fit font-bold text-[10px] md:text-sm leading-5 lg:leading-4"
          href={`/category/${slug}`}
        >
          Посмотреть все
        </LinkButton>
      </div>
    </article>
  );
};

export default CategoryCard;
