import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    //alignItems: "center",
  },
  logoBox: {
    width: "100%",
    height: 250,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: SIZES.large,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.small,
  },
  gameTitleBox: {
    marginTop: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
  },
  gameTitle: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    padding: 10,
  },
  gameReleasedOn: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  gameReleasedOnText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  rating: (item) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.white,
    backgroundColor: item > 4 ? COLORS.green : item < 2.5 ? COLORS.red : COLORS.yellow,
    borderRadius: 10,
    width: 40,
    height: 40,
    textAlign: "center",
    alignContent: "center",
    lineHeight: 40,
  }),
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default styles;
