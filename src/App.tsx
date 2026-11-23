import { useState } from "react";
import type { BagItem } from "./data";
import { AnchorNav } from "./components/AnchorNav";
import { Footer } from "./components/Footer";
import { GlobalNav } from "./components/GlobalNav";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Pricing } from "./components/Pricing";
import { ProductNav } from "./components/ProductNav";
import { Stories } from "./components/Stories";

export default function App() {
  const [bag, setBag] = useState<BagItem | null>(null);
  const [bagOpen, setBagOpen] = useState(false);

  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <GlobalNav
        bag={bag}
        bagOpen={bagOpen}
        onBagOpenChange={setBagOpen}
        onRemove={() => setBag(null)}
      />
      <ProductNav />
      <main id="conteudo">
        <Hero />
        <AnchorNav />
        <Highlights />
        <Stories />
        <Pricing
          bag={bag}
          onAdd={(item) => {
            setBag(item);
          }}
          onShowBag={() => {
            setBagOpen(true);
            document.getElementById("topo")?.scrollIntoView();
          }}
        />
      </main>
      <Footer />
    </>
  );
}
