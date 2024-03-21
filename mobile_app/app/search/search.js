import { Stack, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

import { ScreenHeaderBtn, SearchComp } from "../../components";
import { COLORS, icons } from "../../constants";

export const Search = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
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

      <SearchComp />
    </SafeAreaView>
  );
};

export default Search;
