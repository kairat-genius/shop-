import Banner from "./Banner";
import BestService from "./BestService";
import BrandHistory from "./BrandHistory";
import GlobalAssortment from "./GlobalAssortment";
import QualityGuarantee from "./QualityGuarantee";

const AboutUsView = () => {
  return (
    <main>
      <Banner />
      <QualityGuarantee />
      <GlobalAssortment />
      <BrandHistory />
      <BestService/>
    </main>
  );
};

export default AboutUsView;
