import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    shadowColor: COLORS.gray2,
    height: 100,
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
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
    borderRadius: 10,
    width: 40,
    height: 40,
    textAlign: "center",
    alignContent: "center",
    lineHeight: 40,
  }),
  reviewTitleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: SIZES.xSmall / 2,
    flex: 1,
  },
  reviewTitle: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    padding: 10,
    flex: 1,
    marginHorizontal: SIZES.small,
  },
  reviewDate: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    padding: 10,
    textAlign: "right",
  },
  reviewInfoBox: {
    paddingLeft: SIZES.xSmall / 2,
  },
  reviewedBy: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    padding: 10,
    textAlign: "right",
  },
});

export default styles;
