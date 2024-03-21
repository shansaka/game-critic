import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { images } from "../../../../constants";
import { checkImageURL } from "../../../../utils";
import styles from "./newgamecard.style";

const NewGameCard = ({ item, selected, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.logoContainer}>
        <Image
          source={
            checkImageURL(item.mainImage)
              ? { uri: item.mainImage }
              : images.game_no_image
          }
          resizeMode="fill"
          style={styles.logoImage}
        />
      </View>

      <View style={styles.gameTitleBox}>
        {item.avgRating === 0 ? null : (
          <Text style={styles.rating(item.avgRating)}>{item.avgRating}</Text>
        )}
        <Text style={styles.gameTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewGameCard;
