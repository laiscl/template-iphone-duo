import { lazy, Suspense, useState } from "react";
import type { BagItem, FinishId } from "./data";
import { Footer } from "./components/Footer";
import { GlobalNav } from "./components/GlobalNav";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Pricing } from "./components/Pricing";
import { ProductNav } from "./components/ProductNav";
import { Stories } from "./components/Stories";
import { scrollToId, SiteMotion } from "./motion/SiteMotion";
import { webglAvailable } from "./motion/poses";
import { FinishContext, GlContext } from "./three/gl";

const Stage = lazy(() => import("./three/Stage"));

export default function App() {
  const [bag, setBag] = useState<BagItem | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [glOn, setGlOn] = useState(false);
  const [finish, setFinish] = useState<FinishId>("grafite");
  const canGl = webglAvailable();

  return (
    <GlContext.Provider value={{ on: canGl && glOn, setOn: setGlOn }}>
      <FinishContext.Provider value={{ finish, setFinish }}>
      <SiteMotion />
      {canGl ? (
        <Suspense fallback={null}>
          <Stage />
        </Suspense>
      ) : null}
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
        <Highlights />
        <Stories />
        <Pricing
          bag={bag}
          onAdd={(item) => {
            setBag(item);
          }}
          onShowBag={() => {
            setBagOpen(true);
            scrollToId("topo");
          }}
        />
      </main>
      <Footer />
    </>
      </FinishContext.Provider>
    </GlContext.Provider>
  );
}
