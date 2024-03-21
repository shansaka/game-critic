import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
