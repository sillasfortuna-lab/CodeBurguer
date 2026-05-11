# CodeBurger 🍔

Plataforma de delivery de hambúrgueres artesanais localizada em **Huambo, Angola**. O cliente monta o pedido online, personaliza o hambúrguer ao seu gosto e envia directamente pelo **WhatsApp**. Cada pedido é também registado automaticamente numa folha **Google Sheets**.

---

## Funcionalidades

- Catálogo com Combos, Hambúrgueres, Cachorros Quentes e Bebidas
- Customização completa de hambúrgueres (carnes, ovos, queijo, batata, molhos e vegetais)
- Carrinho de compras com cálculo de preço em tempo real
- Checkout em 4 passos — carrinho → bebidas → localização → dados do cliente
- Selecção de bairro com taxa de entrega automática (12 bairros de Huambo)
- Envio do pedido via WhatsApp com mensagem formatada
- Registo automático dos pedidos em Google Sheets

---

## Tecnologias

- HTML5 + CSS3 + JavaScript (vanilla, sem frameworks)
- [Vercel](https://vercel.com) — deploy e função serverless para proxy seguro
- [Google Apps Script](https://script.google.com) — registo de pedidos em Google Sheets
- [WhatsApp API](https://wa.me) — envio de pedidos via link `wa.me`

---

## Estrutura do projecto

```
CodeBurguer/
├── codeburger_extremamente_atualizado.html   # Aplicação completa (HTML + CSS + JS)
├── api/
│   └── order.js        # Serverless function — proxy seguro para o Google Apps Script
├── server.js           # Servidor local de desenvolvimento (sem npm)
├── vercel.json         # Configuração de deploy no Vercel
├── .env.example        # Template das variáveis de ambiente
├── .gitignore
├── LICENSE
└── README.md
```

---

## Desenvolvimento local

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+

### Configuração

#### 1. Clona o repositório

```bash
git clone https://github.com/sillasfortuna-lab/CodeBurguer.git
cd CodeBurguer
```

#### 2. Cria o ficheiro de ambiente

```bash
cp .env.example .env
```

Abre o `.env` e preenche com a URL do teu Google Apps Script:

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_SCRIPT_ID/exec
```

#### 3. Inicia o servidor

```bash
node server.js
```

Abre em [http://localhost:3000](http://localhost:3000).

> Não tens Node.js? Podes abrir o ficheiro HTML directamente no browser ou correr `py -m http.server 3000`. Tudo funciona excepto o registo no Google Sheets.

---

## Deploy no Vercel

### 1. Importa o repositório em [vercel.com/new](https://vercel.com/new)

### 2. Adiciona a variável de ambiente no painel do Vercel

| Nome               | Valor                          |
|--------------------|--------------------------------|
| `APPS_SCRIPT_URL`  | URL do teu Google Apps Script  |

### 3. Clica em Deploy

O Vercel serve o HTML e activa automaticamente o endpoint `/api/order`.

---

## Variáveis de ambiente

| Variável            | Descrição                                          | Obrigatória              |
|---------------------|----------------------------------------------------|--------------------------|
| `APPS_SCRIPT_URL`   | URL do Google Apps Script para registo de pedidos  | Sim (para Google Sheets) |

A URL do Google Apps Script é mantida apenas no servidor, nunca exposta ao cliente.

---

## Licença

MIT — consulta o ficheiro [LICENSE](LICENSE) para mais detalhes.
