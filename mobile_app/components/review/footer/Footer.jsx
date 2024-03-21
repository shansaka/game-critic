import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCallback, useState } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import styles from "./footer.style";
import { icons, COLORS } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import inputValidator from "../../../helpers/inputValidator";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Location from "expo-location";

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
      const fetchLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          //alert("Permission to access location was denied");
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
      // Alert.alert(
      //   "Success",
      //   "Your review has been submitted, thank you! Your review will be visible after moderation",
      //   [
      //     {
      //       text: "OK",
      //       onPress: () => router.replace(`/gameDetails/${gameId}`),
      //     },
      //   ]
      // );
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
        confirmButtonColor="#DD6B55"
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
