import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../../../constants";
import { checkImageURL } from "../../../../utils";
import styles from "./allgamecard.style";

const AllGameCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={styles.reviewTitleBox}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={
                checkImageURL(item.mainImage)
                  ? { uri: item.mainImage }
                  : images.game_no_image
              }
              resizeMode="cover"
              style={styles.logImage}
            />
          </TouchableOpacity>
          <Text style={styles.reviewTitle} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
        {item.avgRating === 0 ? null : (
          <Text style={styles.rating(item.avgRating)}>{item.avgRating}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AllGameCard;
