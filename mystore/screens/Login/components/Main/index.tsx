import { TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../css/Styles";
import { useState } from "react";
import { ipnode } from "../../../../config/ip";

import * as SQLite from "expo-sqlite";

//constante para refenciar a criação do banco de dados
//dentro do celular
const db = SQLite.openDatabase("mystore.banco");

export default function Main(props: any) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Usuário"
        keyboardType="default"
        style={styles.caixa}
        value={usuario}
        onChangeText={(value) => setUsuario(value)}
      />
      <TextInput
        secureTextEntry
        placeholder="Senha"
        style={styles.caixa}
        value={senha}
        onChangeText={(value) => setSenha(value)}
      />

      <TouchableOpacity
        onPress={() => {
          efetuarLogin(usuario, senha);
          props.acao.navigate("Home");
        }}
        style={styles.btntllogin}
      >
        <Entypo name="login" size={24} color="black" />
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.acao.navigate("Cadastro")}
        style={styles.btntlcadastrar}
      >
        <Entypo name="add-user" size={24} color="black" />
        <Text>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

function efetuarLogin(usuario: any, senha: any) {
  if (usuario == "" || senha == "") {
    return Alert.alert("Erro", "Você deve preecher todos os campos");
  }

  fetch(`${ipnode}/api/usuarios/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomeusuario: usuario,
      senha: senha,
    }),
  })
    .then((response) => response.json())
    .then((rs) => {
      console.log(rs);
      gravarUsuario(rs.payload[0].idusuario, rs.output, rs.token);
    })
    .catch((err) => console.error(`Erro -> ${err}`));
}

//criação da função que constroi a tabela e insere dados
//do usuário autenticado
function gravarUsuario(idusuario: any, situacao: any, token: any) {
  //Vamos realizar 2 transações, onde:
  // 1-Será criada a tabela com os seguintes campos
  //    - id,idusuario,situacao,token
  // 2-Será cadastrado na tabelas os respectivos dados
  db.transaction((dl) => {
    dl.executeSql("drop table dados");
  });

  db.transaction((ts) => {
    ts.executeSql(
      `create table if not exists dados(
        id integer primary key,
        idusuario int,
        situacao text,
        token text
      )`
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      `insert into dados(
        idusuario,
        situacao,
        token
        ) values (?,?,?)`,
      [idusuario, situacao, token]
    );
  });
}
