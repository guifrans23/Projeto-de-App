import { View } from "react-native";
import Header from "./components/Header";
import Main from "./components/Main";
import { styles } from "./css/Styles";

export default function Login({ navigation }) {
  return (
    <View style={styles.login}>
      <Header />
      <Main acao={navigation} />
    </View>
  );
}
