import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

const Tile = ({ children, text, icon, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        height: 130,
        width: 130,
        backgroundColor: "#ffffff80",
        margin: 5,
        borderRadius: 20,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon ? icon : null}
      <Text style={{ color: "black", paddingVertical: 5 }}>{text}</Text>
      {children}
    </TouchableOpacity>
  );
};
export default Tile;
