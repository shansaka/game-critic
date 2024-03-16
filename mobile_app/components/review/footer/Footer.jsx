import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router'
import styles from "./footer.style";
import { icons } from "../../../constants";
import useFetch from '../../../hook/useFetch';
import inputValidator from "../../../helpers/inputValidator";

const Footer = ({ gameId, title, comments, rating, setTitle, setComments }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const requiresAuth = true;
  const { data , isLoading, error, refetch, totalPages, fetchData } = useFetch(`reviews`, null, false, {
    gameId: gameId,
    title: title,
    comments: comments,
    rating: rating,
    location: "location",
  }, requiresAuth);

  const onSubmitPressed = async () => {
    const titleError = inputValidator(title, 'empty')
    const commentsError = inputValidator(comments, 'empty')

    if (titleError || commentsError) {
      setTitle({ ...title, error: titleError })
      setComments({ ...comments, error: commentsError })
      return
    }

    const responseData = await fetchData();

    if(responseData && responseData.isSuccess){
      alert("Review submitted successfully");
    }
    else{
        alert('Please check your email and password.');
    }
  }

  return (
    <View style={styles.container}>
     

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={onSubmitPressed}
      >
        <Text style={styles.applyBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
