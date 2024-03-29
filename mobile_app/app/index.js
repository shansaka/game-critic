import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { AllGames, NewGames, ScreenHeaderBtn, Welcome } from "../components";
import { COLORS, SIZES, images } from "../constants";
import { isLoggedIn } from "../helpers/loginSession";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const loggedIn = await isLoggedIn();
        setLoggedIn(loggedIn);
      };

      checkLogin();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <View dimension="60%" />,
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.account}
              dimension="100%"
              handlePress={() =>
                router.push({
                  pathname: loggedIn ? "auth/logout" : "auth/login",
                })
              }
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push({
                  pathname: `/search/search`,
                  params: {
                    search: "all",
                    searchTitle: `Find "${searchTerm}"`,
                    searchTerm: searchTerm,
                  },
                });
              }
            }}
          />
          <NewGames />
          <AllGames />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
