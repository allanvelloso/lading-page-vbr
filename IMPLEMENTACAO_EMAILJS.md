# 📧 Como Implementar EmailJS no Formulário de Contato

## Por que EmailJS?

EmailJS permite enviar emails diretamente do frontend sem necessidade de backend próprio. É gratuito até 200 emails/mês e muito fácil de configurar.

## Passo a Passo

### 1. Criar Conta no EmailJS

1. Acesse: https://www.emailjs.com/
2. Crie uma conta gratuita
3. Confirme seu email

### 2. Configurar Serviço de Email

1. No dashboard, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. Anote o **Service ID** (ex: `service_xxxxx`)

### 3. Criar Template de Email

1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Use este template:

```
Assunto: Nova Mensagem de Parceria - {{name}}

De: {{name}}
Email: {{email}}
Empresa: {{company}}

Mensagem:
{{message}}

---
Enviado através do site viniciusbrasil.com
```

4. Anote o **Template ID** (ex: `template_xxxxx`)

### 4. Obter Public Key

1. Vá em **Account** > **General**
2. Copie sua **Public Key** (ex: `xxxxxxxxxxxxx`)

### 5. Atualizar o HTML

Adicione o script do EmailJS antes do fechamento do `</body>`:

```html
<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
   (function(){
      emailjs.init("SUA_PUBLIC_KEY_AQUI");
   })();
</script>
```

### 6. Atualizar o JavaScript

Substitua a função de envio do formulário no `script.js`:

```javascript
// CONTACT FORM VALIDATION & SUBMISSION
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset error messages
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';
        document.getElementById('nameError').classList.remove('show');
        document.getElementById('emailError').classList.remove('show');
        document.getElementById('messageError').classList.remove('show');
        
        let isValid = true;
        
        // Validate name
        if (name.length < 3) {
            document.getElementById('nameError').textContent = 'Nome deve ter pelo menos 3 caracteres';
            document.getElementById('nameError').classList.add('show');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Email inválido';
            document.getElementById('emailError').classList.add('show');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Mensagem deve ter pelo menos 10 caracteres';
            document.getElementById('messageError').classList.add('show');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            try {
                // Send email via EmailJS
                await emailjs.send(
                    'SEU_SERVICE_ID',      // Service ID
                    'SEU_TEMPLATE_ID',     // Template ID
                    {
                        name: name,
                        email: email,
                        company: company || 'Não informado',
                        message: message,
                        timestamp: new Date().toLocaleString('pt-BR')
                    }
                );
                
                // Show success message
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // Track event
                trackEvent('form_submission_success', {
                    form_name: 'contact_form',
                    page: window.location.pathname
                });
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    document.getElementById('formSuccess').style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }, 5000);
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.style.cssText = `
                    background-color: rgba(255, 107, 107, 0.1);
                    border: 1px solid #ff6b6b;
                    color: #ff6b6b;
                    padding: 15px;
                    border-radius: 5px;
                    text-align: center;
                    margin-top: 20px;
                `;
                errorDiv.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.';
                contactForm.appendChild(errorDiv);
                
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorDiv.remove();
                }, 5000);
            }
        }
    });
}
```

### 7. Substituir os IDs

No código acima, substitua:
- `SUA_PUBLIC_KEY_AQUI` → Sua Public Key do EmailJS
- `SEU_SERVICE_ID` → Seu Service ID
- `SEU_TEMPLATE_ID` → Seu Template ID

### 8. Testar

1. Preencha o formulário no site
2. Envie uma mensagem de teste
3. Verifique se o email chegou na sua caixa de entrada

## Alternativas ao EmailJS

### Formspree (Mais Simples)
- Acesse: https://formspree.io/
- Crie um formulário
- Use o action URL fornecido no form

### Netlify Forms (Se hospedar no Netlify)
- Adicione `netlify` ao form tag
- Netlify captura automaticamente

### Backend Próprio
- Node.js + Nodemailer
- PHP + PHPMailer
- Python + Flask + SMTP

## Segurança

⚠️ **Importante**: A Public Key do EmailJS pode ser exposta no frontend, mas:
- Configure rate limiting no EmailJS
- Use reCAPTCHA para prevenir spam
- Configure filtros de spam no EmailJS

## Adicionar reCAPTCHA (Opcional)

1. Registre seu site: https://www.google.com/recaptcha/admin
2. Adicione o script antes do `</body>`:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

3. Adicione o widget no formulário:

```html
<div class="g-recaptcha" data-sitekey="SEU_SITE_KEY"></div>
```

4. Valide no JavaScript antes de enviar.

---

**Pronto!** Seu formulário agora envia emails reais. 🎉
