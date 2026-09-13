import CategoryDescription from "./CategoryDescription";
import RelatedBrandsThemes from "../../../widgets/RelatedBrandsThemes";

const CategoryView = () => {
  return (
    <>
      <CategoryDescription />
      <RelatedBrandsThemes className="container" />
    </>
  );
};

export default CategoryView;
