import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.green,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: "#FFF",
    fontFamily: FONT.bold,
  },
});

export default styles;
