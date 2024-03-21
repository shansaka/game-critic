import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetch from "../../../hook/useFetch";

import { COLORS, SIZES } from "../../../constants";
import NewGameCard from "../../common/cards/new/NewGameCard";
import styles from "./newgames.style";

const NewGames = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch, fetchData } = useFetch("games", {
    search: "new",
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const [selectedGame, setSelectedGame] = useState();

  const handleCardPress = (item) => {
    router.push(`/gameDetails/${item._id}`);
    setSelectedGame(item._id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Releases</Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `/search/search`,
              params: { search: "new", searchTitle: "Newly Released" },
            });
          }}
        >
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <NewGameCard
                item={item}
                selected={selectedGame}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?._id}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};
export default NewGames;
