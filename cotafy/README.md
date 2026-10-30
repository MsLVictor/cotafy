# Cotafy

Aplicação web para acompanhar cotações de moedas e criptomoedas em tempo real, ver o histórico de cada moeda e converter valores.

Projeto da 2ª avaliação da disciplina **Tecnologia para Frontend Avançado**.

## Integrantes

| Nome completo | GitHub | Responsável por |
|---|---|---|
| Victor Melquiades Leite | MsLVictor | Home + Loading/Erro e suporte para outras tarefas. |
| Alexandre Chaves Martins | acmartins714 | Cotações + `services/api.ts` |
| Luana Patrícia Gomes da Silva | luanapatriciasilva | Detalhes da moeda  |
| Hrasam | | Conversor + `CurrencyCard` |

## Tecnologias

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org), com [Vite](https://vite.dev)
- [MUI (Material UI)](https://mui.com): biblioteca de componentes
- [React Router](https://reactrouter.com): rotas
- [AwesomeAPI de moedas](https://docs.awesomeapi.com.br/api-de-moedas): API externa (gratuita, sem chave)

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve a versão gerada pelo build |
| `npm run lint` | Procura problemas no código |

## Telas e rotas

| Rota | Tela |
|---|---|
| `/` | Home |
| `/cotacoes` | Lista de cotações |
| `/moeda/:codigo` | Detalhes de uma moeda (ex.: `/moeda/USD`) |
| `/conversor` | Conversor de moedas |
| qualquer outra | Página 404 |

## Estrutura de pastas

```
src/
├── components/
│   ├── common/      # componentes reutilizáveis (PageContainer, Loading, Erro, CurrencyCard...)
│   └── layout/      # Navbar, Footer, Logo e links do menu
├── hooks/           # hooks personalizados (se o grupo criar)
├── layouts/         # MainLayout: Navbar + página atual + Footer
├── pages/           # uma página por rota
├── services/        # chamadas à API
├── theme/           # tema do MUI (cores, fontes, espaçamentos)
├── types/           # tipos TypeScript (respostas da API etc.)
├── App.tsx          # definição das rotas
└── main.tsx         # ponto de entrada: tema, CSS base e roteador
```

## Fluxo de trabalho (Git)

Cada integrante trabalha na própria branch e abre um Pull Request para a `main`:

```bash
git switch main
git pull
git switch feat/nome-sobrenome    # 1ª vez: git switch -c feat/nome-sobrenome
git merge main                    # traz para a sua branch o que já entrou na main
# ... faz as alterações ...
git add .
git commit -m "feat/nome-sobrenome: descrição do que foi feito"
git push -u origin feat/nome-sobrenome
```

Depois, abra o Pull Request no GitHub e escreva `Closes #N` na descrição (N = número da issue).

lembrando de assinar o próprio pr e designar algum outro integrante do projeto, para realizar a aprovação, NÃO FAÇA MERGE NA MAIN SEM CONFIRMAÇÃO DE OUTRO MEMBRO DO GRUPO.

