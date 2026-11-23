import { specs } from "../data";
import { CameraBack, CoverPhone, FlowScreen, HingeMacro, ProfileShot, Silicon, WaterGuard } from "./illustrations";

export function Stories() {
  return (
    <>
      <section className="story" id="design">
        <div className="shell story-grid">
          <div className="story-copy">
            <p className="kicker">Design</p>
            <h2 className="feature-heading">Fino fechado. Generoso quando abre.</h2>
            <p className="feature-copy">
              A dobradiça fica no perfil, não no meio da conversa. Fechado, o Duo acompanha a mão com
              11,2&nbsp;mm. Aberto, as duas telas formam uma superfície contínua de 8 polegadas, estável o
              bastante para escrever, ver um filme ou deixar duas tarefas lado a lado.
            </p>
            <a className="text-link" href="#tela">
              Saiba mais sobre a tela ›
            </a>
          </div>
          <div className="story-art">
            <ProfileShot />
          </div>
        </div>
      </section>

      <section className="band" id="tela">
        <div className="shell">
          <div className="band-head">
            <h2 className="feature-heading">Tela</h2>
            <a className="text-link" href="#destaques">
              Ver a imagem contínua ›
            </a>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <h3 className="feature-heading">8 polegadas sem emenda visível.</h3>
              <p className="feature-copy">
                O painel interno é OLED de ponta a ponta. A dobra é mecânica; a imagem segue reta, a
                120&nbsp;Hz, com brilho para o sol da tarde.
              </p>
              <div className="feature-art" aria-hidden="true">
                <FlowScreen />
              </div>
            </article>
            <article className="feature-card">
              <h3 className="feature-heading">A capa também é tela.</h3>
              <p className="feature-copy">
                Fechado, a tela externa de 6,1 polegadas mostra a hora, a foto e o que chegou — sem abrir
                nada.
              </p>
              <div className="feature-art" aria-hidden="true">
                <CoverPhone />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="story" id="camera">
        <div className="shell story-grid">
          <div className="story-copy">
            <p className="kicker">Câmera</p>
            <h2 className="feature-heading">Pronta dos dois lados da mesa.</h2>
            <p className="feature-copy">
              O módulo traseiro reúne uma principal de 48&nbsp;MP e uma ultra-angular. Abra o aparelho e a
              prévia ocupa as duas telas. Feche, e a tela externa vira visor para quem está sendo
              fotografado.
            </p>
            <a className="text-link" href="#durabilidade">
              Ver a dobra de perto ›
            </a>
          </div>
          <div className="story-art">
            <CameraBack />
          </div>
        </div>
      </section>

      <section className="story" id="chip">
        <div className="shell story-grid">
          <div className="story-copy">
            <p className="kicker">Duo Engine</p>
            <h2 className="feature-heading">Potência desenhada para a dobra.</h2>
            <p className="feature-copy">
              O Duo Engine divide o trabalho entre as duas telas sem dividir a bateria. Edição, jogos
              leves e vídeo em 4K ficam no mesmo bloco térmico, feito para o corpo fino.
            </p>
            <a className="text-link" href="#preco">
              Ver configurações ›
            </a>
          </div>
          <div className="story-art">
            <Silicon />
          </div>
        </div>
        <div className="shell">
          <dl className="specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band" id="durabilidade">
        <div className="shell">
          <div className="band-head">
            <h2 className="feature-heading">Feito para abrir todo dia.</h2>
          </div>
          <div className="duo-cards">
            <article className="feature-card">
              <h3 className="feature-heading">IP68 no bolso e na chuva.</h3>
              <p className="feature-copy">
                Poeira e água encontram um corpo fechado. A ilustração é didática: o número é o que fica
                na ficha, não um teste de laboratório desta página.
              </p>
              <div className="feature-art" aria-hidden="true">
                <WaterGuard />
              </div>
            </article>
            <article className="feature-card">
              <h3 className="feature-heading">A dobra abre todo dia.</h3>
              <p className="feature-copy">
                O barril central distribui o movimento. Por fora, duas chapas. Por dentro, a tela segue
                sem pedir que você pense na dobradiça.
              </p>
              <div className="feature-art" aria-hidden="true">
                <HingeMacro />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
