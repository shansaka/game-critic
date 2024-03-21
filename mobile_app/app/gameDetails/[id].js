import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  Game,
  GameAbout,
  GameFooter,
  GameReview,
  GameTabs,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import { isLoggedIn } from "../../helpers/loginSession";
import useFetch from "../../hook/useFetch";

const tabs = ["Reviews", "About"];

export const GameDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { data, isLoading, error, refetch, fetchData } = useFetch(
    `games/${params.id}`
  );

  const [loggedIn, setLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const loggedIn = await isLoggedIn();
        setLoggedIn(loggedIn);
      };

      checkLogin();

      fetchData();
    }, [])
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Reviews":
        return <GameReview data={data} />;

      case "About":
        return <GameAbout data={data} />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Game data={data} />

              <GameTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <GameFooter
          handlePress={() => {
            if (loggedIn) {
              router.push({
                pathname: "/review/addReview",
                params: { ...data },
              });
            } else {
              router.push({
                pathname: "/auth/login",
                params: { ...data, redirectUrl: "/review/addReview" },
              });
            }
          }}
        />
      </>
    </SafeAreaView>
  );
};

export default GameDetails;
