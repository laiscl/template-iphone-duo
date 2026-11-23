import { useState } from "react";
import {
  finishes,
  formatUSD,
  leaseMonthly,
  monthly,
  storageOptions,
  type BagItem,
  type FinishId,
  type StorageId,
} from "../data";
import { DuoDevice } from "./DuoDevice";
import { CheckIcon } from "./Icons";

type Props = {
  bag: BagItem | null;
  onAdd: (item: BagItem) => void;
  onShowBag: () => void;
};

export function Pricing({ bag, onAdd, onShowBag }: Props) {
  const [finish, setFinish] = useState<FinishId>("grafite");
  const [storage, setStorage] = useState<StorageId>("256");
  const selected = storageOptions.find((item) => item.id === storage) ?? storageOptions[0];
  const inBag = bag?.finish === finish && bag.storage === storage;
  const tone = finishes.find((item) => item.id === finish) ?? finishes[0];

  return (
    <section className="story" id="preco">
      <div className="shell pricing-grid">
        <div className="pricing-visual" aria-hidden="true">
          <DuoDevice finish={finish} />
        </div>
        <div className="pricing-copy">
          <p className="kicker">Comprar</p>
          <h2 className="feature-heading">Escolha o seu.</h2>
          <p className="feature-copy">
            Três acabamentos, três capacidades. Os valores são ilustrativos, em dólares, para este estudo
            visual — não é uma loja.
          </p>

          <p className="option-label" id="acabamento-label">
            Acabamento — {tone.name}
          </p>
          <div className="swatches" role="group" aria-labelledby="acabamento-label">
            {finishes.map((item) => (
              <button
                key={item.id}
                type="button"
                className="swatch"
                style={{ background: item.frame }}
                aria-label={item.name}
                aria-pressed={finish === item.id}
                onClick={() => setFinish(item.id)}
              />
            ))}
            <span className="finish-name">{tone.name}</span>
          </div>

          <p className="option-label" id="capacidade-label">
            Capacidade
          </p>
          <div className="storage" role="group" aria-labelledby="capacidade-label">
            {storageOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                className="storage-option"
                aria-pressed={storage === item.id}
                onClick={() => setStorage(item.id)}
              >
                <span>{item.label}</span>
                <span className="storage-meta">
                  {formatUSD(item.price)}
                  {storage === item.id ? <CheckIcon /> : null}
                </span>
              </button>
            ))}
          </div>

          <div className="summary-price">
            <p className="price-main">{formatUSD(selected.price)}</p>
            <p className="price-sub">
              ou {formatUSD(monthly(selected.price), 2)}/mês por 24 meses · aluguel{" "}
              {formatUSD(leaseMonthly(selected.price), 2)}/mês
            </p>
          </div>

          <div className="buy-row">
            <button
              type="button"
              className="pill pill-price"
              disabled={inBag}
              onClick={() => onAdd({ finish, storage, price: selected.price })}
            >
              {inBag ? "Na sacola" : "Comprar"}
            </button>
            {inBag ? (
              <button type="button" className="text-link" onClick={onShowBag}>
                Ver sacola
              </button>
            ) : null}
          </div>
          <p className="sr-only" role="status">
            {inBag ? `${tone.name}, ${selected.label}, adicionado à sacola.` : ""}
          </p>
        </div>
      </div>
      <div className="shell">
        <ol className="footnotes" id="notas">
          <li>
            Preço de partida ilustrativo do modelo de 256&nbsp;GB. Parcelas de 24 meses sem impostos, só
            para leitura da página.
          </li>
          <li>
            O plano de troca é um valor ilustrativo, proporcional ao preço cheio, e não representa uma
            oferta comercial.
          </li>
        </ol>
      </div>
    </section>
  );
}
