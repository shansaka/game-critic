import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./allgamecard.style";
import { checkImageURL } from "../../../../utils";

const AllGameCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: item.mainImage
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item?.name}
        </Text>

        <Text style={styles.itemType}>{item?.item_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AllGameCard;