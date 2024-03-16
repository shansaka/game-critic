import { useState, useCallback } from "react";
import { router, useRouter, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import styles from "./allgames.style";
import { COLORS, SIZES } from "../../../constants";
import AllGameCard from "../../common/cards/all/AllGameCard";
import useFetch from "../../../hook/useFetch";

const AllGames = () => {
  const [activeJobType, setActiveJobType] = useState("Full-time");
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

      {/* <View style={styles.tabsContainer}>
          <FlatList
            data={gameGenres}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={styles.tab(activeJobType, item)} 
                onPress={() => {
                  setActiveJobType(item)
                  router.push(`/search/${item}`)
                }}
              >
                <Text style={styles.tabText(activeJobType, item)} > {item} </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          >
          </FlatList>
      </View> */}

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
