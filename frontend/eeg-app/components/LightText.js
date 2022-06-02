import { Text } from "react-native";

const LightText = ({ text, style }) => {
  return (
    <Text style={{ color: "#f5f5f5", fontWeight: "100", ...style }}>
      {text}
    </Text>
  );
};
export default LightText;
