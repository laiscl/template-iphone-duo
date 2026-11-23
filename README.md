# iPhone Duo

Estudo visual de uma página de produto, no idioma de uma galeria branca: o aparelho no centro, tipografia quieta e azul só nos controles de conversão. Não é a Apple, não vende hardware e não usa imagens oficiais da marca. Os renders são ilustrações originais.

## Rodar

```bash
npm install
npm run dev
```

Abre em [http://127.0.0.1:42871](http://127.0.0.1:42871).

```bash
npm run build
npm run lint
```

## O que a página faz

- Navegação global com menu, busca e sacola
- Subnavegação do produto com **Explorar** e **Comprar**
- Hero, destaques em carrossel, capítulos de design, tela, câmera, chip e durabilidade
- Configurador de acabamento e capacidade, com preço ilustrativo
- Rodapé na faixa `#f5f5f7`

A tipografia pede SF Pro Display e SF Pro Text. Se elas não estiverem instaladas, a página usa `-apple-system` e, em seguida, Inter.
