import * as Location from "expo-location";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { COLORS } from "../../../constants";
import inputValidator from "../../../helpers/inputValidator";
import useFetch from "../../../hook/useFetch";
import styles from "./footer.style";

const Footer = ({ gameId, title, comments, rating, setTitle, setComments }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [locationData, setLocationData] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

  const requiresAuth = true;
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `reviews`,
    null,
    false,
    {
      gameId: gameId,
      title: title,
      comments: comments,
      rating: rating,
      location: locationData,
    },
    requiresAuth
  );

  useFocusEffect(
    useCallback(() => {
      // Get the user's location
      const fetchLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        setLocationData({ latitude, longitude });
      };

      fetchLocation();
    }, [])
  );

  // Submit review
  const onSubmitPressed = async () => {
    const titleError = inputValidator(title, "empty");
    const commentsError = inputValidator(comments, "empty");

    if (titleError || commentsError) {
      setTitle((prevState) => ({ ...prevState, error: titleError }));
      setComments((prevState) => ({ ...prevState, error: commentsError }));
      return;
    }

    const responseData = await fetchData();

    if (responseData) {
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <TouchableOpacity style={styles.applyBtn} onPress={onSubmitPressed}>
          <Text style={styles.applyBtnText}>Submit</Text>
        </TouchableOpacity>
      )}

      <AwesomeAlert
        style={{ width: "100%", height: "100%", position: "absolute" }}
        show={showAlert}
        showProgress={false}
        title="Your review has been submitted, thank you!"
        message="Your review will be visible after moderation"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        //showCancelButton={true}
        showConfirmButton={true}
        //cancelText="No, cancel"
        confirmText="Okay, Got it!"
        confirmButtonColor={COLORS.green}
        confirmButtonStyle={styles.alertButton}
        onConfirmPressed={() => {
          router.replace(`/gameDetails/${gameId}`);
        }}
        onDismiss={() => {
          router.replace(`/gameDetails/${gameId}`);
        }}
      />
    </View>
  );
};

export default Footer;
