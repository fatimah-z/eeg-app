import { Text } from "react-native";

const Heading = ({ text, style }) => {
  return (
    <Text style={{ color: "#fff", fontWeight: "bold", ...style }}>{text}</Text>
  );
};
export default Heading;
