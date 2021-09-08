import { Dimensions } from "react-native";

function useDimensions() {
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;

  return [height, width];
}

export default useDimensions;
