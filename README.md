# iPhone Duo

Estudo visual de uma página de produto: galeria branca, tipografia quieta e azul só nos controles. Não é a Apple, não vende hardware e não usa imagens oficiais da marca. O aparelho dobrável é um modelo 3D próprio, com dobradiça que abre, fecha e fica em tenda.

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

A tipografia pede SF Pro Display e SF Pro Text. Se elas não estiverem instaladas, a página usa `-apple-system` e, em seguida, Inter.

## O que a página faz

- Hero com mãos segurando o aparelho. O modelo 3D inclina um pouco com o mouse e com a rolagem. Um clique alterna aberto, fechado e tenda.
- Rolagem suave e seções com reveal, stagger e scrub.
- “Expansive display” fica fixa enquanto o aparelho sobe e abre.
- “Take a closer look”: as pills trocam pose e ângulo com transição.
- Na câmera, o módulo desliza e gira com a rolagem.
- Acabamento e capacidade animam o material. Botões, links, cards, sacola e navegação têm feedback de hover e clique.
- Sem WebGL, o aparelho volta para o desenho em CSS. Com `prefers-reduced-motion`, a rolagem e as transições ficam imediatas.

## Bibliotecas e licenças

| Peça | Uso | Licença |
| --- | --- | --- |
| [three](https://github.com/mrdoob/three.js) | Cena, materiais PBR, `RoomEnvironment` | MIT |
| [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) | Renderer React | MIT |
| [@react-three/drei](https://github.com/pmndrs/drei) | `View` (um canvas compartilhado), `PerspectiveCamera`, `RoundedBox` | MIT |
| [gsap](https://gsap.com/standard-license) e [@gsap/react](https://github.com/greensock/react) | ScrollTrigger, reveals, hover e clique | Standard “no charge” license |
| [lenis](https://github.com/darkroomengineering/lenis) | Rolagem suave | MIT |
| [@fontsource/inter](https://fontsource.org/fonts/inter) | Fallback de SF Pro | OFL-1.1 |
| React | Interface | MIT |

Não há modelo glTF de terceiros. O aparelho é geometria própria para a dobradiça ser um eixo de verdade, sem mesh de marca. As fotos `memory-portrait.jpg` e `dune-wallpaper.jpg` e a foto das mãos são originais deste estudo. Nada aqui é asset da Apple.
