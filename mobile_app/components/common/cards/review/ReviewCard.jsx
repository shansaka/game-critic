import { Text, View } from "react-native";
import { formatDate } from "../../../../utils";
import styles from "./reviewcard.style";

const ReviewCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewTitleBox}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Text style={styles.rating(item.rating)}>{item.rating}</Text>
          <Text style={styles.reviewTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <Text style={styles.reviewDate}>{formatDate(item.dateCreated)}</Text>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.reviewInfoBox}>
        <Text>{item.comments}</Text>
        <Text style={styles.reviewedBy}>{item.user.name}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
