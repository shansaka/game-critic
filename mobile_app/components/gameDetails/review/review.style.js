import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  loadMoreBtn: {
    flex: 1,
    backgroundColor: COLORS.gray,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    margin: SIZES.small,
    padding: SIZES.xSmall,
  },
  loadMoreText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});

export default styles;
