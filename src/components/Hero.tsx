import { DuoDevice } from "./DuoDevice";

export function Hero() {
  return (
    <section className="hero" id="topo" aria-label="Apresentação">
      <div className="hero-copy">
        <p className="product-name">iPhone Duo</p>
        <h1 className="hero-display">Hello, hello.</h1>
        <div className="hero-sub">
          <p>Pre-order starting 5:00 a.m. PT on 10.16</p>
          <p>Available starting 10.23</p>
        </div>
      </div>
      <div className="hero-visual">
        <img className="hero-hands grip-left" src="/hero-hands.jpg" alt="" />
        <img className="hero-hands grip-right" src="/hero-hands.jpg" alt="" />
        <div className="hero-stage">
          <DuoDevice />
        </div>
      </div>
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
    </section>
  );
}
