import { useState, useEffect } from 'react'
import { router, useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";

import styles from "./gamegenre.style";
import { COLORS, SIZES } from "../../../constants";
import AllGameCard from "../../common/cards/all/AllGameCard";
import useFetch from "../../../hook/useFetch";

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
            renderItem={({item}) => (
              <TouchableOpacity 
                style={styles.tab(activeGameGenre, item)} 
                onPress={() => {
                  setGameGenre(item)
                  router.push(`/search/${item._id}`)
                }}
              >
                <Text style={styles.tabText(activeGameGenre, item)} > {item.name} </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          >
          </FlatList>
      </View>
    </View>
  );
};

export default GameGenre;