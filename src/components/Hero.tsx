import { DuoDevice } from "./DuoDevice";

export function Hero() {
  return (
    <section className="hero" id="topo" aria-label="Apresentação">
      <div className="hero-copy">
        <p className="launch">Novo</p>
        <p className="product-name">iPhone Duo</p>
        <h1 className="hero-display">Hello, hello.</h1>
        <div className="hero-sub">
          <p>Pré-venda a partir das 5:00, horário do Pacífico, em 16.10</p>
          <p>Disponível a partir de 23.10</p>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-stage">
          <DuoDevice />
        </div>
        <div className="capsule-wrap">
          <div className="capsule">
            <div className="capsule-copy">
              <p className="price-main">
                A partir de US$&nbsp;1.999 ou US$&nbsp;83,29/mês por 24 meses.
                <a className="fn" href="#notas">
                  1
                </a>
              </p>
              <p className="price-sub">
                Aluguel a partir de US$&nbsp;57,99/mês por 24 meses com o plano de troca.
                <a className="fn" href="#notas">
                  2
                </a>
              </p>
            </div>
            <a className="pill pill-price" href="#preco">
              Ver preços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
