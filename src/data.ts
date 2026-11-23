export type FinishId = "grafite" | "prata" | "areia";
export type StorageId = "256" | "512" | "1tb";

export type BagItem = {
  finish: FinishId;
  storage: StorageId;
  price: number;
};

export type Finish = {
  id: FinishId;
  name: string;
  frame: string;
  hinge: string;
  lip: string;
};

export const finishes: readonly Finish[] = [
  { id: "grafite", name: "Grafite", frame: "#1c1c1e", hinge: "#070708", lip: "#c7c7cc" },
  { id: "prata", name: "Prata", frame: "#d8d8de", hinge: "#a9a9b0", lip: "#f7f7f8" },
  { id: "areia", name: "Areia", frame: "#d9c4a6", hinge: "#b08968", lip: "#f4e7d4" },
] as const;

export const storageOptions = [
  { id: "256" as const, label: "256 GB", price: 1999 },
  { id: "512" as const, label: "512 GB", price: 2299 },
  { id: "1tb" as const, label: "1 TB", price: 2699 },
];

const leaseRatio = 57.99 / (1999 / 24);

export function monthly(price: number) {
  return price / 24;
}

export function leaseMonthly(price: number) {
  return monthly(price) * leaseRatio;
}

export function formatUSD(value: number, digits = 0) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function finishById(id: FinishId) {
  return finishes.find((item) => item.id === id) ?? finishes[0];
}

export const anchors = [
  { id: "destaques", label: "Destaques" },
  { id: "design", label: "Design" },
  { id: "tela", label: "Tela" },
  { id: "camera", label: "Câmera" },
  { id: "chip", label: "Chip" },
  { id: "preco", label: "Preços" },
] as const;

export const searchEntries = [
  { id: "destaques", title: "Destaques", detail: "O que muda quando o aparelho abre", keys: "destaques recursos filme cards" },
  { id: "design", title: "Design", detail: "Espessura, dobra e como ele cabe na mão", keys: "design fino dobra espessura bolso" },
  { id: "tela", title: "Tela", detail: "Painel interno de 8 polegadas e tela de capa", keys: "tela oled display 120 hz capa" },
  { id: "camera", title: "Câmera", detail: "Módulo traseiro e prévia nas duas telas", keys: "camera câmera foto lente 48" },
  { id: "chip", title: "Duo Engine", detail: "Desempenho, vídeo e especificações", keys: "chip desempenho processador engine bateria" },
  { id: "durabilidade", title: "Durabilidade", detail: "Dobradiça diária e resistência IP68", keys: "durabilidade ip68 agua água dobradiça" },
  { id: "preco", title: "Preços", detail: "Acabamento, capacidade e pré-venda", keys: "preço precos comprar sacola armazenamento gb" },
] as const;

export const globalNav = [
  {
    label: "Loja",
    note: "A loja deste estudo leva direto ao iPhone Duo.",
    links: [
      { label: "Visão geral", href: "#topo" },
      { label: "Destaques", href: "#destaques" },
      { label: "Ver preços", href: "#preco" },
    ],
  },
  {
    label: "Mac",
    note: "Página única: os atalhos abrem capítulos do Duo.",
    links: [
      { label: "Design", href: "#design" },
      { label: "Chip", href: "#chip" },
      { label: "Comprar", href: "#preco" },
    ],
  },
  {
    label: "iPad",
    note: "A tela interna conversa com o jeito de usar um tablet.",
    links: [
      { label: "Tela", href: "#tela" },
      { label: "Destaques", href: "#destaques" },
      { label: "Preços", href: "#preco" },
    ],
  },
  {
    label: "iPhone",
    note: "Você está na página do iPhone Duo.",
    links: [
      { label: "Visão geral", href: "#topo" },
      { label: "Câmera", href: "#camera" },
      { label: "Comprar", href: "#preco" },
    ],
  },
  {
    label: "Watch",
    note: "Continua no mesmo estudo visual.",
    links: [
      { label: "Durabilidade", href: "#durabilidade" },
      { label: "Especificações", href: "#chip" },
      { label: "Preços", href: "#preco" },
    ],
  },
  {
    label: "Vision",
    note: "A cena abre nas duas telas, sem sair desta página.",
    links: [
      { label: "Tela", href: "#tela" },
      { label: "Câmera", href: "#camera" },
      { label: "Design", href: "#design" },
    ],
  },
  {
    label: "AirPods",
    note: "Áudio entra na história da bateria e do vídeo.",
    links: [
      { label: "Destaques", href: "#destaques" },
      { label: "Duo Engine", href: "#chip" },
      { label: "Preços", href: "#preco" },
    ],
  },
  {
    label: "TV e Casa",
    note: "O filme cabe aberto na mesa.",
    links: [
      { label: "Tela", href: "#tela" },
      { label: "Destaques", href: "#destaques" },
      { label: "Comprar", href: "#preco" },
    ],
  },
  {
    label: "Entretenimento",
    note: "Uma imagem só, atravessando a dobra.",
    links: [
      { label: "Tela", href: "#tela" },
      { label: "Câmera", href: "#camera" },
      { label: "Destaques", href: "#destaques" },
    ],
  },
  {
    label: "Acessórios",
    note: "Acabamentos e capacidades ilustrativos.",
    links: [
      { label: "Acabamentos", href: "#preco" },
      { label: "Design", href: "#design" },
      { label: "Especificações", href: "#chip" },
    ],
  },
  {
    label: "Suporte",
    note: "Especificações e cuidados com a dobra.",
    links: [
      { label: "Especificações", href: "#chip" },
      { label: "Durabilidade", href: "#durabilidade" },
      { label: "Preços", href: "#preco" },
    ],
  },
] as const;

export const specs = [
  ["Tela interna", "8,0 pol. OLED"],
  ["Tela externa", "6,1 pol. OLED"],
  ["Atualização", "120 Hz"],
  ["Câmera principal", "48 MP"],
  ["Espessura fechado", "11,2 mm"],
  ["Resistência", "IP68"],
] as const;
