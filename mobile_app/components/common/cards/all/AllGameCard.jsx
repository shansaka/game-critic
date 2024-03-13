import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./allgamecard.style";
import { checkImageURL } from "../../../../utils";

const AllGameCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>

      <View style={styles.reviewTitleBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri: item.mainImage
            }}
            resizeMode='contain'
            style={styles.logImage}
          />
        </TouchableOpacity>
          <Text style={styles.reviewTitle} numberOfLines={2}>{item.name}</Text> 
          
        </View>
        <Text style={styles.rating(item.avgRating)}>{item.avgRating}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AllGameCard;