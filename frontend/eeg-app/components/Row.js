import { View } from "react-native";

const Row = ({ children }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>{children}</View>
  );
};
export default Row;
