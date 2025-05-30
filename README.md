# ListaDeHabitos 📝

Projeto desenvolvido para ajudar usuários a monitorar e vencer maus hábitos de forma simples e intuitiva.

## 🚀 Tecnologias Utilizadas

- **Frontend:** [AngularJS 1.8.2](https://angularjs.org/), [Bootstrap 5.3.6](https://getbootstrap.com/)
- **Backend:** [PHP](https://www.php.net/) (API REST)
- **Banco de Dados:** MySQL
- **Ambiente:** XAMPP

## 💡 Funcionalidades

- Cadastro de novos hábitos
- Listagem de hábitos cadastrados
- Marcar hábito como vencido ou retomar hábito
- Remover hábitos da lista
- Interface responsiva e moderna

## 🎯 Como rodar o projeto localmente

1. **Clone este repositório:**
   ```sh
   git clone https://github.com/Reynanz/ListaDeHabitos.git
   ```

2. **Instale o [XAMPP](https://www.apachefriends.org/index.html) e inicie o Apache e o MySQL.**

3. **Configure o banco de dados:**
   - Abra o painel do XAMPP e clique em "Admin" no MySQL para acessar o phpMyAdmin.
   - Crie um banco de dados chamado `listadehabitos`.
   - Importe o arquivo [`ListaDeHabitos-spa/database/habito.sql`](ListaDeHabitos-spa/database/habito.sql) para criar as tabelas necessárias.

4. **Coloque a pasta `ListaDeHabitos-spa` dentro do diretório `htdocs` do XAMPP:**
   - Exemplo de caminho: `C:\xampp\htdocs\ListaDeHabitos-spa`

5. **Acesse o sistema no navegador:**
   ```
   http://localhost/ListaDeHabitos-spa/
   ```

Pronto! Agora você pode cadastrar, listar e gerenciar seus hábitos.

## 📁 Estrutura do Projeto

```
ListaDeHabitos/
├── ListaDeHabitos-spa/
│   ├── index.html
│   ├── css/
│   ├── database/
│   ├── js/
│   ├── lib/
│   ├── listadehabitos-rest-api/
│   └── partials/
├── LICENSE
└── README.md
```

## 👨‍💻 Autor

- [Reynanz](https://github.com/Reynanz)

---

Sinta-se à vontade para contribuir, sugerir melhorias ou reportar issues!