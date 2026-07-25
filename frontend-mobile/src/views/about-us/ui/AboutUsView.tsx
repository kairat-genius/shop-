import Banner from "./Banner";
import BestService from "./BestService";
import BrandHistory from "./BrandHistory";
import GlobalAssortment from "./GlobalAssortment";
import QualityGuarantee from "./QualityGuarantee";
import AboutUsNav from "./AboutUsNav";

const AboutUsView = () => {
  return (
    <main>
      <AboutUsNav/>
      <Banner />
      <QualityGuarantee />
      <GlobalAssortment />
      <BrandHistory />
      <BestService />
    </main>
  );
};

export default AboutUsView;
