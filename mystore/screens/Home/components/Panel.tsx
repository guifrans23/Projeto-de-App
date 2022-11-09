import { Image, View } from "react-native";

export default function Panel() {
  return (
    <View style={{ height: 300 }}>
      <Image
        source={{
          uri: "https://microcamp.com.br/wp-content/uploads/2020/08/Dia-da-Informatica.jpg",
        }}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </View>
  );
}
