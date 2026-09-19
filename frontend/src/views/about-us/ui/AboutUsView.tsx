import Banner from "./Banner";
import Contact from "./Contact";
import CustomerReviews from "./CustomerReviews";
import Partner from "./Partner";
import Protections from "./Protections";

import SocialAbout from "./SocialAbout";
import Why from "./Why";

const AboutUsView = () => {
  return (
    <main>
      <Banner />
      <SocialAbout/>
      <Partner/>
      <Why/>
      <Protections/>
      <CustomerReviews/>
      <Contact/>
    </main>
  );
};

export default AboutUsView;
