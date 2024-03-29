import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./welcome.style";

import { icons } from "../../../constants";
import { getSessionItem, isLoggedIn } from "../../../helpers/loginSession";

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [name, setDisplayName] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchDisplayName = async () => {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          const name = await getSessionItem("username");
          setDisplayName(name);
        } else {
          setDisplayName("");
        }
      };

      fetchDisplayName();
    }, [])
  );

  return (
    <View>
      <View style={styles.container}>
        {name ? <Text style={styles.userName}> Hello {name}</Text> : null}

        <Text style={styles.welcomeMessage}> Welcome to the Game Critic </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search by name of the game"
            onChange={() => {}}
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            style={styles.searchBtnImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
