import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import AllGameCard from "../../common/cards/all/AllGameCard";
import styles from "./allgames.style";

const AllGames = () => {
  const router = useRouter();
  const { data, isLoading, error, fetchData } = useFetch("games");

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Games</Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `/search/search`,
              params: { search: "all", searchTitle: "All" },
            });
          }}
        >
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((item) => (
            <AllGameCard
              item={item}
              key={`allGames_${item._id}`}
              handleNavigate={() => router.push(`/gameDetails/${item._id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default AllGames;
