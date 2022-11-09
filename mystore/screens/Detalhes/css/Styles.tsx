import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 2,
    padding: 10,
    paddingTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  titulo: {
    fontSize: 20,
    color: "white",
    fontweight: "bold",
  },
  btncarrinho: {
    width: "50%",
    padding: 20,
    backgroundColor: "#600",
    margin: 20,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtcarrinho: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
