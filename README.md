# AdminSamCast - Painel Administrativo

Painel administrativo para gerenciamento do sistema SamCast.

## 🚀 Deploy em Produção

O painel está configurado para rodar em `http://samhost.wcore.com.br/Admin/`

### Configuração do Servidor

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
# Editar .env com as configurações corretas
```

3. **Build e deploy:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Estrutura de URLs

- **Painel Admin:** `http://samhost.wcore.com.br/Admin/`
- **API Admin:** `http://samhost.wcore.com.br/Admin/api/`
- **Health Check:** `http://samhost.wcore.com.br/Admin/api/health`

### Configuração do Nginx

Use o arquivo `nginx.conf` como referência para configurar o servidor web.

### Desenvolvimento Local

```bash
# Frontend
npm run dev

# Backend
npm run server:dev
```

O painel de desenvolvimento estará disponível em `http://localhost:5173/Admin/`
