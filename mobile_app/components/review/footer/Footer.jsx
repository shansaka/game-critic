import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useCallback, useState } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import styles from "./footer.style";
import { icons } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import inputValidator from "../../../helpers/inputValidator";
import * as Location from "expo-location";

const Footer = ({ gameId, title, comments, rating, setTitle, setComments }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [locationData, setLocationData] = useState(false);

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
          alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let reverseGeocode = await Location.reverseGeocodeAsync(
          location.coords
        );
        let city = reverseGeocode[0].city;
        let country = reverseGeocode[0].country;
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        setLocationData({ city, country, latitude, longitude });
      };

      fetchLocation();
    }, [])
  );

  const onSubmitPressed = async () => {
    const titleError = inputValidator(title, "empty");
    const commentsError = inputValidator(comments, "empty");

    if (titleError || commentsError) {
      setTitle({ ...title, error: titleError });
      setComments({ ...comments, error: commentsError });
      return;
    }

    const responseData = await fetchData();

    if (responseData) {
      router.replace(`/gameDetails/${gameId}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.applyBtn} onPress={onSubmitPressed}>
        <Text style={styles.applyBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
