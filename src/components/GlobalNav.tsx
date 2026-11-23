import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useId, useRef, useState, type HTMLAttributes } from "react";
import { finishById, formatUSD, globalNav, searchEntries, type BagItem } from "../data";
import { prefersReducedMotion } from "../motion/poses";
import { BagIcon, MarkIcon, MenuIcon, SearchIcon } from "./Icons";

function RiseIn({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(ref.current, { y: 14, opacity: 0, duration: 0.5, ease: "power3.out" });
  });
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}

type Props = {
  bag: BagItem | null;
  bagOpen: boolean;
  onBagOpenChange: (open: boolean) => void;
  onRemove: () => void;
};

export function GlobalNav({ bag, bagOpen, onBagOpenChange, onRemove }: Props) {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const menuId = useId();

  const active = globalNav.find((item) => item.label === menu) ?? null;
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const results = normalized
    ? searchEntries.filter((entry) =>
        `${entry.title} ${entry.detail} ${entry.keys}`.toLocaleLowerCase("pt-BR").includes(normalized),
      )
    : searchEntries;

  useEffect(() => {
    if (!searchOpen) return;
    searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileOpen || window.innerWidth >= 1180) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const open = Boolean(menu || searchOpen || bagOpen || mobileOpen);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
        onBagOpenChange(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenu(null);
        setSearchOpen(false);
        onBagOpenChange(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menu, searchOpen, bagOpen, mobileOpen, onBagOpenChange]);

  const closeLayers = () => {
    setMenu(null);
    setSearchOpen(false);
    setMobileOpen(false);
    onBagOpenChange(false);
  };

  return (
    <header
      ref={headerRef}
      className={menu || searchOpen ? "global is-open" : "global"}
    >
      <div className="global-inner">
        {searchOpen ? (
          <form
            className="search-form"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor={searchId}>
              Buscar
            </label>
            <input
              ref={searchRef}
              id={searchId}
              className="search-input"
              placeholder="Buscar"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              enterKeyHint="search"
            />
            <button
              type="button"
              className="icon-btn"
              aria-label="Fechar busca"
              onClick={() => setSearchOpen(false)}
            >
              <MenuIcon open />
            </button>
          </form>
        ) : (
          <>
            <a className="logo" href="#topo" aria-label="Início" onClick={closeLayers}>
              <MarkIcon />
            </a>
            <nav className="nav-links" aria-label="Global">
              {globalNav.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="nav-link"
                  aria-expanded={menu === item.label}
                  onClick={() => {
                    setSearchOpen(false);
                    onBagOpenChange(false);
                    setMenu((current) => (current === item.label ? null : item.label));
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="nav-tools">
              <button
                type="button"
                className="icon-btn"
                aria-label="Buscar"
                aria-expanded={searchOpen}
                onClick={() => {
                  setMenu(null);
                  setMobileOpen(false);
                  onBagOpenChange(false);
                  setSearchOpen(true);
                }}
              >
                <SearchIcon />
              </button>
              <div className="bag-anchor">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={bag ? "Sacola, 1 item" : "Sacola"}
                  aria-expanded={bagOpen}
                  onClick={() => {
                    setMenu(null);
                    setSearchOpen(false);
                    onBagOpenChange(!bagOpen);
                  }}
                >
                  <BagIcon />
                  {bag ? <span className="bag-count">1</span> : null}
                </button>
                {bagOpen ? (
                  <RiseIn className="bag-panel" role="dialog" aria-label="Sacola">
                    {bag ? (
                      <>
                        <p className="bag-title">iPhone Duo</p>
                        <p className="bag-meta">
                          {finishById(bag.finish).name} · {bag.storage === "1tb" ? "1 TB" : `${bag.storage} GB`}
                        </p>
                        <p className="bag-title">{formatUSD(bag.price)}</p>
                        <div className="bag-actions">
                          <button type="button" className="text-link" onClick={onRemove}>
                            Remover
                          </button>
                          <a className="pill pill-price" href="#preco" onClick={closeLayers}>
                            Ver preços
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="bag-empty">Sua sacola está vazia.</p>
                        <div className="bag-actions">
                          <a className="text-link" href="#preco" onClick={closeLayers}>
                            Ver preços
                          </a>
                        </div>
                      </>
                    )}
                  </RiseIn>
                ) : null}
              </div>
              <button
                type="button"
                className="icon-btn menu-toggle"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                aria-controls={menuId}
                onClick={() => {
                  setSearchOpen(false);
                  onBagOpenChange(false);
                  setMobileOpen((open) => !open);
                }}
              >
                <MenuIcon open={mobileOpen} />
              </button>
            </div>
          </>
        )}
      </div>

      {active ? (
        <RiseIn className="mega">
          <div className="shell mega-inner">
            <p className="mega-note">{active.note}</p>
            <ul className="mega-links">
              {active.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={closeLayers}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </RiseIn>
      ) : null}

      {searchOpen ? (
        <RiseIn className="search-panel">
          <div className="shell">
            {results.length === 0 ? (
              <p className="search-empty">Nenhum resultado para “{query.trim()}”.</p>
            ) : (
              <ul className="search-list">
                {results.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`} onClick={closeLayers}>
                      <strong>{entry.title}</strong>
                      <span>{entry.detail}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </RiseIn>
      ) : null}

      {mobileOpen ? (
        <nav className="mobile-menu" id={menuId} aria-label="Menu">
          <div className="shell">
            {globalNav.map((item) => (
              <a key={item.label} href={item.links[0]?.href ?? "#topo"} onClick={closeLayers}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
