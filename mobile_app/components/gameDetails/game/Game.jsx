import React from "react";
import { View, Text, Image } from "react-native";
import { checkImageURL } from "../../../utils";
import styles from "./game.style";
import { icons, images } from "../../../constants";

const Game = ({ data }) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(data.dateReleased).toLocaleDateString(
    undefined,
    options
  );

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
        <Text style={styles.gameReleasedOn}>{formattedDate.toUpperCase()}</Text>
      </View>
    </View>
  );
};

export default Game;
