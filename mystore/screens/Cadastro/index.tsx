import { View } from "react-native";
import Header from "./components/Header";
import Main from "./components/Main";
import { styles } from "./css/Styles";

export default function Cadastro() {
  return (
    <View style={styles.cadastro}>
      <Header />
      <Main />
    </View>
  );
}
