import React from "react";
import { Image, Text, View } from "react-native";
import { images } from "../../../constants";
import { checkImageURL, formatDate } from "../../../utils";
import styles from "./game.style";

const Game = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={
            checkImageURL(data.mainImage)
              ? { uri: data.mainImage }
              : images.game_no_image
          }
          style={styles.logoImage}
        />
      </View>

      <View style={styles.gameTitleBox}>
        <Text style={styles.rating(data.avgRating)}>{data.avgRating}</Text>
        <Text style={styles.gameTitle} numberOfLines={2}>
          {data.name}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.gameReleasedOnText}>Released On: </Text>
        <Text style={styles.gameReleasedOn}>
          {formatDate(data.dateReleased)}
        </Text>
      </View>
    </View>
  );
};

export default Game;
