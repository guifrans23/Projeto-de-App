import { AntDesign } from "@expo/vector-icons";
import { View, Image, Text } from "react-native";
import { styles } from "../css/Styles";
export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/38/63/d0/3863d0113a6660487d9ad1f84ef6bd1c.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.titulo}> MyStore </Text>
      <AntDesign name="shoppingcart" size={24} color="white" />
    </View>
  );
}
