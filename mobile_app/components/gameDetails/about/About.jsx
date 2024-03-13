import { View, Text } from "react-native";

import styles from "./about.style";

const GameDescription = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the game:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{data.description}</Text>
      </View>
    </View>
  );
};

export default GameDescription;
