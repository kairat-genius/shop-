import HomeView from "@/views/home";
import ProductTabsSection from "@/views/home/ui/ProductTabsSection";

export default async function HomePage() {

  return (
    <main>
        <HomeView/>
        <ProductTabsSection/>
    </main>
  );
}
