import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router'
import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ item }) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
     

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={
          () =>  router.push({ pathname: `/`, params: { item }})
        }
      >
        <Text style={styles.applyBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
