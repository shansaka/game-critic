import React from 'react'
import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator 
} from 'react-native'
import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

import styles from './newgames.style'
import { COLORS, SIZES } from '../../../constants'
import  NewGameCard  from '../../common/cards/new/NewGameCard'


const NewGames = () => {
  const router = useRouter();
  const {data, isLoading, error, refetch, fetchData} = useFetch('games', {search: 'new'});

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            router.push({ pathname: `/search/search`, params: { search: 'new', searchTitle: "Newly Released" }})
          }}
        >
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ): (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <NewGameCard 
                item={item}
                selected={selectedGame}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?._id}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}
export default NewGames