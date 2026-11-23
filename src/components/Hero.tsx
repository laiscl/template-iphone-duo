import { heroPointer } from "../motion/poses";
import { SplitHeading } from "../motion/SplitHeading";
import { PhoneSlot } from "../three/PhoneSlot";

export function Hero() {
  return (
    <section className="hero" id="topo" aria-label="Apresentação">
      <div className="hero-copy">
        <p className="product-name">iPhone Duo</p>
        <SplitHeading as="h1" className="hero-display" text="Hello, hello." />
        <div className="hero-sub">
          <p>Pre-order starting 5:00 a.m. PT on 10.16</p>
          <p>Available starting 10.23</p>
        </div>
      </div>
      <div
        className="hero-visual"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          heroPointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          heroPointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        }}
        onPointerLeave={() => {
          heroPointer.x = 0;
          heroPointer.y = 0;
        }}
      >
        <img className="hero-hands" src="/hero-hands.jpg" alt="" />
        <div className="hero-stage">
          <PhoneSlot
            variant="hero"
            screen="home"
            label="iPhone Duo no hero. Clique para abrir, fechar ou pôr em tenda."
          />
        </div>
        <img className="hero-thumbs thumb-left" src="/hero-hands.jpg" alt="" />
        <img className="hero-thumbs thumb-right" src="/hero-hands.jpg" alt="" />
        <div className="capsule-wrap">
          <div className="capsule">
            <div className="capsule-copy">
              <p className="price-main">
                From $1999 or $83.29/mo. for 24 mo.
                <a className="fn" href="#notas">
                  1
                </a>
              </p>
              <p className="price-sub">
                Lease from $57.99/mo. for 24 mo. with Apple Upgrade
                <a className="fn" href="#notas">
                  2
                </a>
              </p>
            </div>
            <a className="pill pill-price" href="#preco">
              View pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
