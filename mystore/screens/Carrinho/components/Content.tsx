import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ipnode, ipspring } from "../../../config/ip";
import { styles } from "../css/Styles";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mystore.banco");

let idus = 0;

export default function Content(props: any) {
  obterId();
  const { idusuario } = props;

  const [carregando, setCarregando] = useState(true);

  const [produtos, setProdutos] = useState([
    {
      idcarrinho: "",
      idusuario: "",
      chavecarrinho: "",
      idproduto: "",
      nomeproduto: "",
      preco: "",
      quantidade: "",
      subtotal: "",
    },
  ]);

  useEffect(() => {
    fetch(`http://10.26.49.21:8080/api/usuarios/carrinho/${idus}`)
      .then((response) => response.json())
      .then((rs) => {
        setProdutos(rs.output);
        setCarregando(false);
        console.log(rs.output);
      })
      .catch((erro) => console.error(`Erro ao executar a api -> ${erro}`));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      {carregando ? (
        <ActivityIndicator size={100} color="#f00" />
      ) : (
        <View>
          <ScrollView horizontal={false}>
            {produtos.map((itens, ix) => (
              <View
                key={ix}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "silver",
                  flexDirection: "row",
                }}
              >
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Text style={styles.produto}>
                    Produto: {itens.nomeproduto}
                  </Text>

                  <Text style={styles.preco}> Preço: R$ {itens.preco}</Text>

                  <Text style={styles.preco}>
                    {" "}
                    Subtotal: R${itens.subtotal}
                  </Text>

                  <TouchableOpacity
                    style={styles.btnremovercarrinho}
                    onPress={() => alert("oi")}
                  >
                    <Text style={styles.txtcarrinho}>
                      <AntDesign name="delete" size={24} color="white" />
                      Remover
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.quantidade}>
                    Quantidade: - {itens.quantidade} +
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => alert("Fechar")}
              style={styles.fecharpedido}
            >
              <Text style={styles.txtfecharpedido}>Fechar o pedido</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

async function obterId() {
  await db.transaction((ds) => {
    ds.executeSql(
      `select idusuario from dados 
      order by id desc`,
      [],
      (_, { rows }) => {
        console.log(rows._array[0].idusuario);
      }
    );
  });
}
