const columns = [
  {
    title: "Comprar e aprender",
    links: [
      { label: "iPhone Duo", href: "#topo" },
      { label: "Destaques", href: "#destaques" },
      { label: "Design", href: "#design" },
      { label: "Ver preços", href: "#preco" },
    ],
  },
  {
    title: "O aparelho",
    links: [
      { label: "Tela", href: "#tela" },
      { label: "Câmera", href: "#camera" },
      { label: "Duo Engine", href: "#chip" },
      { label: "Durabilidade", href: "#durabilidade" },
    ],
  },
  {
    title: "Este estudo",
    links: [
      { label: "Tipografia", href: "#topo" },
      { label: "Galeria", href: "#destaques" },
      { label: "Especificações", href: "#chip" },
      { label: "Notas", href: "#notas" },
    ],
  },
  {
    title: "Sacola",
    links: [
      { label: "Configurar", href: "#preco" },
      { label: "Preços ilustrativos", href: "#preco" },
      { label: "Pré-venda", href: "#topo" },
      { label: "Suporte visual", href: "#durabilidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <p className="disclaimer">
          Estudo visual independente de uma página de produto. Não vendemos aparelhos, não representamos
          a Apple e os desenhos desta página foram feitos para o projeto. Preços, datas e especificações
          são ilustrativos. SF Pro, quando não está instalada, cede lugar a Inter.
        </p>
        <div className="footer-cols">
          {columns.map((column) => (
            <section key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="legal">
          <p>Estudo visual. Renders originais.</p>
          <p>Brasil</p>
        </div>
      </div>
    </footer>
  );
}
