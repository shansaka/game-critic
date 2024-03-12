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
  gameName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item._id ? COLORS.white : COLORS.primary,
    paddingLeft: 10,
    paddingTop: 5
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  rating: (item) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.white,
    padding: 10,
    marginTop: 10,
    backgroundColor: item > 4 ? COLORS.yellow : COLORS.green,
    borderRadius: 10,
    width: 40,
    height: 40,
    textAlign: "center",
  }),
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
