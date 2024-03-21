import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 200,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.green,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.gray2,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  alertButton: {
    //width: "100%",
    backgroundColor: COLORS.green,
    textAlign: "center",
    padding: 100,
    //height: 50,
  },
});

export default styles;
