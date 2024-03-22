import React from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import AllGameCard from "../common/cards/all/AllGameCard";

import styles from "./searchstyle";

export const Search = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { ...params, pageNo: currentPage };

  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `games`,
    paramsWithPageNo,
    true
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <AllGameCard
          item={item}
          handleNavigate={() =>
            router.push({ pathname: `gameDetails/${item._id}` })
          }
        />
      )}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
      ListHeaderComponent={() => (
        <>
          <View style={styles.container}>
            <Text style={styles.searchTitle}>{params.searchTitle}</Text>
            <Text style={styles.searchGame}>Games</Text>
          </View>
          <View style={styles.loaderContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              error && <Text>Oops something went wrong</Text>
            )}
          </View>
        </>
      )}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
    />
  );
};

export default Search;
