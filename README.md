# ListaDeHabitos 📝

Projeto desenvolvido para ajudar usuários a monitorar e vencer maus hábitos de forma simples e intuitiva.

## 🚀 Tecnologias Utilizadas

- **Frontend:** [AngularJS 1.8.2](https://angularjs.org/), [Bootstrap 5.3.6](https://getbootstrap.com/)
- **Backend:** [PHP](https://www.php.net/) (API REST)
- **Banco de Dados:** MySQL
- **Ambiente:** XAMPP ou servidor local simples (ex: Python HTTP Server)

## 💡 Funcionalidades

- Cadastro de novos hábitos
- Listagem de hábitos cadastrados
- Marcar hábito como vencido ou retomar hábito
- Remover hábitos da lista
- Interface responsiva e moderna

## 🎯 Como rodar o projeto localmente

### Backend (API PHP)

1. **Instale o [XAMPP](https://www.apachefriends.org/index.html) e inicie o Apache e o MySQL.**
2. **Configure o banco de dados:**
   - Abra o painel do XAMPP e clique em "Admin" no MySQL para acessar o phpMyAdmin.
   - Crie um banco de dados chamado `listadehabitos`.
   - Importe o arquivo [`ListaDeHabitos-spa/database/habito.sql`](ListaDeHabitos-spa/database/habito.sql) para criar as tabelas necessárias.
3. **Coloque a pasta `ListaDeHabitos-spa` dentro do diretório `htdocs` do XAMPP:**
   - Exemplo de caminho: `C:\xampp\htdocs\ListaDeHabitos-spa`

### Frontend (SPA AngularJS)

Você pode rodar o frontend de duas formas:

#### Usando XAMPP (recomendado para integração total)

- Acesse no navegador:
  ```
  http://localhost/ListaDeHabitos-spa/
  ```

#### Usando servidor local simples (apenas frontend)

1. Abra o terminal na pasta do projeto:
   ```
   cd "c:\Users\reyna\OneDrive\Documents\Projetos\ListaDeHabitos\ListaDeHabitos-spa"
   ```
2. Execute um servidor local (exemplo usando Python 3):
   ```
   python -m http.server 8080
   ```
3. Acesse no navegador:
   ```
   http://localhost:8080/
   ```
> **Obs:** Para que o frontend se comunique com a API PHP, ela precisa estar rodando no XAMPP (Apache).

## 📁 Estrutura do Projeto

```
ListaDeHabitos-spa/
├── index.html
├── css/
├── database/
├── js/
├── lib/
├── listadehabitos-rest-api/
│   └── habito.php
├── partials/
└── README.md
```

## ⚙️ Observações sobre o código

- O frontend carrega os hábitos automaticamente ao abrir a página.
- As operações de inserir, atualizar, vencer, retomar e remover hábitos são feitas via requisições HTTP para a API PHP.
- O backend retorna respostas em JSON.
- O código foi ajustado para evitar duplicidade e garantir que a lista de hábitos seja atualizada corretamente.

## 👨‍💻 Autor

- [Reynanz](https://github.com/Reynanz)

---

Sinta-se à vontade para contribuir, sugerir melhorias ou