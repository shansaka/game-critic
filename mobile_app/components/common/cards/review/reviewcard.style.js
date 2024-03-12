import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: "#fff",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginBottom: SIZES.small,
  },
  rating: (item) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.white,
    backgroundColor: item > 4.5 ? COLORS.yellow : COLORS.green,
    borderRadius: 10,
    width: 40,
    height: 40,
    textAlign: "center",
    alignContent: "center",
    lineHeight: 40,
  }),
  reviewTitleBox: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingLeft: SIZES.xSmall /2,
    flex: 1,
  },
  reviewTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    padding: 10,
  },
  reviewDate: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    padding: 10,
    textAlign: "right",
  },
  reviewInfoBox: {
    paddingLeft: SIZES.xSmall /2,
  },
  horizontalLine: {
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1,
    marginVertical: SIZES.small,
  },
});

export default styles;
