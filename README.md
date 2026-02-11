# Vinicius Brasil - Site Profissional

Site premium para Vinicius Brasil, ex-atleta de fisiculturismo, desenvolvido com **HTML, CSS e JavaScript puro** (sem frameworks).

## 📋 Características

- **Design Dark Premium** com acentos em dourado e vermelho escuro
- **4 Páginas Principais**: Home, Parcerias, Consultoria e Contato
- **Totalmente Responsivo**: Mobile, Tablet e Desktop
- **Animações Suaves**: Fade-in ao scroll, hover effects elegantes
- **Menu Hambúrguer**: Navegação mobile funcional
- **Formulário de Contato**: Validação em JavaScript
- **Integração WhatsApp**: Links diretos para contato
- **Otimizado para SEO**: Meta tags, estrutura semântica
- **Performance**: Lazy loading, código limpo e organizado

## 📁 Estrutura do Projeto

```
vinicius-brasil-site/
├── index.html              # Página Home
├── parcerias.html          # Página Media Kit & Parcerias
├── consultoria.html        # Página Consultoria (Planos)
├── contato.html            # Página Contato
├── css/
│   ├── style.css           # Estilos principais
│   └── responsive.css      # Media queries
├── js/
│   └── script.js           # Interatividade e validação
├── images/                 # Imagens do Media Kit
└── README.md               # Este arquivo
```

## 🎨 Design

### Paleta de Cores
- **Fundo Primário**: #0a0a0a (Preto profundo)
- **Fundo Secundário**: #1a1a1a (Cinza muito escuro)
- **Fundo Terciário**: #2a2a2a (Cinza escuro)
- **Destaque**: #d4af37 (Ouro)
- **Destaque Escuro**: #b8860b (Ouro escuro)
- **Vermelho Escuro**: #8b0000 (Acentos alternativos)
- **Texto Claro**: #ffffff (Branco)
- **Texto Cinza**: #cccccc (Cinza claro)

### Tipografia
- **Fonte Principal**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tamanhos de Título**: 28px a 56px (responsivo)
- **Tamanho de Corpo**: 14px a 18px (responsivo)

## 🚀 Como Usar

### Localmente (Desenvolvimento)

1. **Clone ou baixe o projeto**
   ```bash
   cd vinicius-brasil-site
   ```

2. **Inicie um servidor local**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Ou Node.js (se tiver http-server instalado)
   npx http-server
   
   # Ou use qualquer outro servidor local
   ```

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

### Hospedagem

O site pode ser hospedado em qualquer servidor que suporte arquivos estáticos (HTML, CSS, JS):

- **Netlify**: Drag & drop o projeto
- **Vercel**: Conecte seu repositório Git
- **GitHub Pages**: Faça push para um repositório
- **Servidor Tradicional**: FTP/SFTP
- **Cloudflare Pages**: Hospedagem gratuita
- **AWS S3 + CloudFront**: Para escala

## 📄 Páginas

### 1. **Home (index.html)**
- Hero section impactante
- Trajetória em 4 etapas
- Galeria de competições
- Estatísticas de autoridade
- Call-to-action para consultoria e parcerias

### 2. **Parcerias (parcerias.html)**
- Apresentação profissional
- Audiência e alcance
- Nichos de atuação
- Oportunidades de parceria
- Diferenciais competitivos

### 3. **Consultoria (consultoria.html)**
- 3 planos de consultoria
  - **Avulsa**: R$ 119,99 (PIX) / R$ 129,99 (Cartão)
  - **Trimestral**: R$ 289,99 (PIX) / R$ 319,99 (Cartão)
  - **Semestral**: R$ 499,99 (PIX) / R$ 549,99 (Cartão) ⭐ Destaque
- Depoimentos de alunos
- Botões diretos para WhatsApp

### 4. **Contato (contato.html)**
- Seção para alunos (WhatsApp direto)
- Seção para marcas (Formulário + Email)
- Links para redes sociais
- Informações de contato

## 🔧 Funcionalidades JavaScript

### Menu Hambúrguer
- Abre/fecha automaticamente em mobile
- Fecha ao clicar em um link
- Animação suave

### Validação de Formulário
- Nome (mínimo 3 caracteres)
- Email (validação de formato)
- Mensagem (mínimo 10 caracteres)
- Mensagens de erro personalizadas
- Feedback de sucesso

### Animações
- **Fade-in ao scroll**: Elementos aparecem com delay escalonado
- **Hover effects**: Botões e cards com transições suaves
- **Counter animation**: Números animados ao entrar na viewport
- **Scroll to top**: Botão flutuante para voltar ao topo

### Navegação
- Links suave para seções
- Indicador de página ativa no menu
- Navegação por teclado (Escape para fechar menu)

## 📱 Responsividade

- **Mobile**: 480px e abaixo
- **Tablet**: 481px a 768px
- **Desktop**: 769px e acima
- **Large Screens**: 1200px e acima

Todas as seções se adaptam perfeitamente a cada breakpoint.

## 🔐 Segurança

- Validação de formulário no cliente
- Sem dados sensíveis armazenados localmente
- Links WhatsApp usando protocolo seguro
- Sem dependências externas perigosas

## ⚡ Performance

- Sem frameworks pesados
- Código CSS otimizado
- JavaScript minimalista
- Lazy loading de imagens
- Animações com GPU acceleration

## 📞 Contato

- **Email**: viniicius.br2@gmail.com
- **WhatsApp**: (22) 99900-8197
- **Instagram**: @vinibrasil_o
- **Facebook**: Vinicius Brasil

## 📝 Notas de Desenvolvimento

### Customizações Comuns

1. **Mudar cores**: Edite as variáveis CSS em `css/style.css` (`:root`)
2. **Adicionar seções**: Copie uma seção existente e adapte
3. **Mudar imagens**: Substitua os arquivos em `images/`
4. **Atualizar textos**: Edite os arquivos HTML

### Melhorias Futuras

- [ ] Backend para formulário de contato
- [ ] Sistema de blog
- [ ] Galeria com lightbox
- [ ] Chat ao vivo
- [ ] Integração com Instagram Feed
- [ ] Sistema de agendamento

## 📄 Licença

Desenvolvido para Vinicius Brasil © 2026. Todos os direitos reservados.

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript puro**
