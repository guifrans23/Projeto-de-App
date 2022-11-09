import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ipspring } from "../../../config/ip";
import { styles } from "../css/Styles";

export default function Content(props: any) {
  const { idproduto } = props;

  const [carregando, setCarregando] = useState(true);

  const [produtos, setProdutos] = useState({
    idproduto: "",
    nomeproduto: "",
    descricao: "",
    categoria: "",
    quantidade: 0,
    preco: "",
    foto1: "foto1.jpg",
    foto2: "foto2.jpg",
    foto3: "foto3.jpg",
    foto4: "foto4.jpg",
  });

  useEffect(() => {
    fetch(`${ipspring}/api/produto/pesquisar/${idproduto}`)
      .then((response) => response.json())
      .then((rs) => {
        setProdutos(rs);
        setCarregando(false);
        console.log(rs);
      })
      .catch((erro) => console.error(`Erro ao executar a api -> ${erro}`));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      {carregando ? (
        <ActivityIndicator size={100} color="#f00" />
      ) : (
        <View>
          <ScrollView horizontal={true}>
            <Image
              source={{ uri: `${produtos.foto1}` }}
              style={{
                width: 400,
                height: 300,
                resizeMode: "cover",
                margin: 20,
              }}
            />
            <Image
              source={{ uri: `${produtos.foto2}` }}
              style={{
                width: 400,
                height: 300,
                resizeMode: "cover",
                margin: 20,
              }}
            />
            <Image
              source={{ uri: `${produtos.foto3}` }}
              style={{
                width: 400,
                height: 300,
                resizeMode: "cover",
                margin: 20,
              }}
            />
            <Image
              source={{ uri: `${produtos.foto4}` }}
              style={{
                width: 400,
                height: 300,
                resizeMode: "cover",
                margin: 20,
              }}
            />
          </ScrollView>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>{produtos.nomeproduto}</Text>
            <Text>{produtos.categoria}</Text>
            <Text>{produtos.preco}</Text>
            <Text>{produtos.descricao}</Text>

            <TouchableOpacity
              style={styles.btncarrinho}
              onPress={() => alert("oi")}
            >
              <Text style={styles.txtcarrinho}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
