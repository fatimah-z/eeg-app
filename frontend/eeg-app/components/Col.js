import { View } from "react-native";

const Col = ({ children, flex, style }) => {
  return <View style={{ display: "flex", flex, ...style }}>{children}</View>;
};
export default Col;
