import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 200,
    padding: SIZES.small,
    backgroundColor: selectedJob === item._id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.small,
    //justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    //height: 280,
  }),
  logoContainer: (selected, item) => ({
    width: 180,
    height: 180,
    backgroundColor: selected === item._id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.small,
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  rating: (item) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.white,
    backgroundColor: item > 4.5 ? COLORS.yellow : COLORS.green,
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
  gameTitle: (selected, item) => ({
    color: selected === item._id ? COLORS.white : COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    padding: 10,
  }),
});

export default styles;
