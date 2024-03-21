import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS.gray2,
    marginBottom: SIZES.small,
  },
  logoContainer: {
    height: 180,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.small,
  },
  rating: (item) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.white,
    backgroundColor:
      item > 4 ? COLORS.green : item < 2.5 ? COLORS.red : COLORS.yellow,
    borderRadius: SIZES.small,
    width: 40,
    height: 40,
    textAlign: "center",
    alignContent: "center",
    lineHeight: 40,
  }),
  gameTitleBox: {
    marginTop: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
  },
  gameTitle: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    padding: 10,
  },
});

export default styles;
