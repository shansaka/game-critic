import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./reviewcard.style";

const ReviewCard = ({ item }) => {

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(item.dateCreated).toLocaleDateString(undefined, options);

  return (
    <View style={styles.container}>
      
      <View style={styles.reviewTitleBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.rating(item.rating)}>{item.rating ? item.rating : 5}</Text>
          <Text style={styles.reviewTitle} numberOfLines={1}>{item.user.displayName}</Text> 
        </View>
        <Text style={styles.reviewDate}>{formattedDate.toUpperCase()}</Text> 
      </View>

      <View style={styles.horizontalLine} />
      
      <View style={styles.reviewInfoBox}>
        <Text>
          {item.comments}
        </Text>
      </View>
     

      {/* <View style={styles.textContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item?.user}
        </Text>

        <Text style={styles.itemType}>{item?.comments}</Text>
        <Text style={styles.itemType}>{item?.location}</Text>
      </View> */}
    </View>
  );
};

export default ReviewCard;