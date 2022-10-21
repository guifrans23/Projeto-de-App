// importação do módulo express para gerenciar o servidor
//de aplicação em node
const express = require("express");
// importação do módulo do cors para nos ajudar no
// trato com protocolos de requisição diferentes, tais
// como: http; https; file; ftp
const cors = require("cors");
// importação do módulo do mysql
const mysql = require("mysql2");
// importação do módulo do jsonwebtoken para nos ajudar
// a trabalhar com seção segura
const jwt = require("jsonwebtoken");
//para criptografar as senhas será utilizado o bcrypt
//vamos importar o módulo
const bcrypt = require("bcrypt");

// Criando uma instância do servidor para carregá-lo.
// faremos isso usando a constante app
const app = express();

// configurar o servidor express para aceitar dados em
// formato json.
app.use(express.json());

// configurar o servidor para lidar com as requisições
// de várias origens. Para isso iremos usar o cors
app.use(cors());

// Configuração para comuinicação com o banco de dados
const con = mysql.createConnection({
  host: "172.17.0.1",
  port: "6520",
  user: "root",
  password: "alunos@123",
  database: "bancoloja",
});
// executar a conexão com o banco de dados
con.connect((erro) => {
  if (erro) {
    console.error(
      `Erro ao tentar carregar o servidor de banco de dados ->${erro}`
    );
    return;
  }
  console.log(`Servidor de banco de dados conectado -> ${con.threadId}`);
});

// Vamos criar as rotas com os endpoints para realizar o gerenciamento
// dos dados dos clientes
app.get("/api/usuarios/listar", (req, res) => {
  //vamos consultar os clientes cadastrados em banco e retornar os dados
  con.query("Select * from usuario", (erro, result) => {
    if (erro) {
      return res
        .status(400)
        .send({ output: `Erro ao tentar carregar dados->${erro}` });
    }
    res.status(200).send({ output: result });
  });
});

app.get("/api/usuarios/listar/:id", (req, res) => {
  con.query(
    "Select * from usuario where idusuario=?",
    [req.params.id],
    (erro, result) => {
      if (erro) {
        return res
          .status(400)
          .send({ output: `Erro ao tentar localizar o cliente->${erro}` });
      }
      res.status(200).send({ output: result });
    }
  );
});

app.post("/api/usuarios/cadastro", (req, res) => {
  bcrypt.hash(req.body.senha, 10, (erro, result) => {
    if (erro) {
      return res
        .status(503)
        .send({ output: `Erro interno ao gerar a senha ->${erro}` });
    }
    req.body.senha = result;

    con.query("INSERT INTO usuario SET ?", [req.body], (erro, result) => {
      if (erro) {
        return res
          .status(400)
          .send({ output: `Erro ao tentar cadastrar -> ${erro}` });
      }
      res.status(201).send({ output: `Cadastro realizado`, payload: result });
    });
  });
});

app.post("/api/usuarios/login", (req, res) => {
  const us = req.body.nomeusuario;
  const sh = req.body.senha;

  con.query(
    "Select * from usuario where nomeusuario=?",
    [us],
    (erro, result) => {
      if (erro) {
        return res
          .status(400)
          .send({ output: `Erro ao tentar logar -> ${erro}` });
      }
      if (!result) {
        return res.status(404).send({ output: "Usuário não localizado" });
      }

      bcrypt.compare(sh, result[0].senha, (erro, igual) => {
        if (erro) {
          return res.status(503).send({ output: `Erro interno->${erro}` });
        }
        if (!igual) {
          return res.status(400).send({ output: `Sua senha está incorreta` });
        }
        const token = criarToken(
          result[0].idusuario,
          result[0].nomeusuario,
          result[0].email
        );

        res
          .status(200)
          .send({ output: `Logado`, payload: result, token: token });
      });
    }
  );
});

app.put("/api/usuarios/atualizar/:id", verificar, (req, res) => {
  con.query(
    "Update usuario set ? where idusuario=?",
    [req.body, req.params.id],
    (erro, result) => {
      if (erro) {
        return res
          .status(400)
          .send({ output: `Erro ao tentar atualizar -> ${erro}` });
      }
      res.status(200).send({ output: `Dados atualizados`, payload: result });
    }
  );
});
[req.body, req.params.id],
  (erro, result) => {
    if (erro) {
      return res
        .status(400)
        .send({ output: `Erro ao tentar atualizar -> ${erro}` });
    }
    res.status(200).send({ output: `Dados atualizados`, payload: result });
  };

app.delete("/api/usuarios/apagar/:id", (req, res) => {
  con.query(
    "Delete from usuario where idusuario=?",
    [req.params.id],
    (erro, result) => {
      if (erro) {
        return res
          .status(400)
          .send({ output: `Erro ao tenta apagar->${erro}` });
      }
      res.status(204).send({});
    }
  );
});

app.post("/api/usuarios/carrinho", (req, res) => {
  con.query("insert into carrinho set ?", [req.body], (erro, result) => {
    if (erro) {
      return res
        .status(500)
        .send({ output: `Erro ao tentar cadastrar -> ${erro}` });
    }
    res
      .status(201)
      .send({ output: `Produto adicionado ao carrinho`, dados: result });
  });
});

app.get("/api/usuarios/carrinho/:id", (req, res) => {
  con.query(
    "select * from carrinho where idusuario=?",
    [req.params.id],
    (erro, result) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar carregar o carrinho -> ${erro}` });
      }
      res.status(200).send({ output: result });
    }
  );
});

app.put("/api/usuarios/carrinho/:id", (req, res) => {
  con.query(
    "update carrinho set ? where idcarrinho=?",
    [req.body, req.params.id],
    (erro, result) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: `Não foi possível atualizar o carrinho -> ${erro}` });
      }
      res.status(200).send({ output: result });
    }
  );
});

app.delete("/api/usuarios/carrinho/:id", (req, res) => {
  con.query(
    "delete from carrinho where idusuario=?",
    [req.params.id],
    (erro, result) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: `Falha ao tentar concluir o pagamento ->${erro}` });
      }
      res.status(204).send({ output: `Apagou` });
    }
  );
});

function verificar(req, res, next) {
  const token_enviado = req.headers.token;

  if (!token_enviado) {
    return res.status(401).send({
      output: `Token não existe. 
        Você não tem autorização para acessar esta página`,
    });
  }
  jwt.verify(token_enviado, "senac", (erro, rs) => {
    if (erro) {
      return res.status(503).send({
        output: `Erro no processo de 
            verificação do token->${erro}`,
      });
    }
    return next();
  });
}

function criarToken(id, usuario, email) {
  return jwt.sign({ id: id, usuario: usuario, email: email }, "senac", {
    expiresIn: "2d",
  });
}

app.listen(3000, () => console.log(`Servidor online em http://localhost:3000`));
