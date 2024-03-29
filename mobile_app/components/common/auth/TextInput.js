import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { COLORS } from "../../../constants";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={COLORS.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: COLORS.backgroundColor,
  },
  description: {
    fontSize: 13,
    color: COLORS.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: COLORS.red,
    paddingTop: 8,
  },
});
