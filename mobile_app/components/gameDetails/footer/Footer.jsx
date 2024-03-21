import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./footer.style";

const Footer = ({ handlePress }) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addReviewBtn} onPress={handlePress}>
        <Text style={styles.addReviewBtnText}>Add a review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
