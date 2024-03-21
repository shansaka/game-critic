import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "./gamegenre.style";

const GameGenre = () => {
  const router = useRouter();
  const { data, isLoading, error, fetchData } = useFetch("genres", {});

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const firstItem = data && data.length > 0 ? data[0] : null;
  const [activeGameGenre, setGameGenre] = useState(firstItem);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Games</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeGameGenre, item)}
              onPress={() => {
                setGameGenre(item);
                router.push(`/search/${item._id}`);
              }}
            >
              <Text style={styles.tabText(activeGameGenre, item)}>
                {" "}
                {item.name}{" "}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        ></FlatList>
      </View>
    </View>
  );
};

export default GameGenre;
