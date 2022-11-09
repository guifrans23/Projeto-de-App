import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { ipnode } from "../../../../config/ip";
import { styles } from "../../css/Styles";

export default function Main() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <ScrollView horizontal={false} style={{ flex: 1 }}>
      <View>
        <TextInput
          placeholder="Nome"
          style={styles.caixa}
          value={nome}
          onChangeText={(value) => setNome(value)}
        />

        <TextInput
          placeholder="E-Mail"
          keyboardType="email-address"
          style={styles.caixa}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="CPF"
          keyboardType="number-pad"
          style={styles.caixa}
          value={cpf}
          onChangeText={(value) => setCpf(value)}
        />
        <TextInput
          placeholder="Usuário"
          style={styles.caixa}
          value={usuario}
          onChangeText={(value) => setUsuario(value)}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.caixa}
          value={senha}
          onChangeText={(value) => setSenha(value)}
        />

        <TouchableOpacity
          onPress={() => {
            efetuarCadastro(nome, email, cpf, usuario, senha);
          }}
          style={styles.btntccadastrar}
        >
          <Entypo name="save" size={24} color="black" />
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function efetuarCadastro(
  nome: any,
  email: any,
  cpf: any,
  usuario: any,
  senha: any
) {
  if (nome == "" || email == "" || cpf == "" || usuario == "" || senha == "") {
    return Alert.alert("Erro", "Você deve preencher todos os campos");
  }

  fetch(`${ipnode}/api/usuarios/cadastro`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomeusuario: usuario,
      email: email,
      cpf: cpf,
      nomecompleto: nome,
      senha: senha,
    }),
  })
    .then((response) => response.json())
    .then((rs) => console.log(rs))
    .catch((erro) => console.error(`Erro -> ${erro}`));
}
