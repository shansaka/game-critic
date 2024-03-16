import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router'
import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ handlePress}) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
     

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={handlePress}
      >
        <Text style={styles.applyBtnText}>Add a review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
