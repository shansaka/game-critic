import React from 'react'
import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator 
} from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

import styles from './newgames.style'
import { COLORS, SIZES } from '../../../constants'
import  NewGameCard  from '../../common/cards/new/NewGameCard'


const NewGames = () => {
  const router = useRouter();
  const {data, isLoading, error, refetch} = useFetch('games/new');

  const [selectedGame, setSelectedGame] = useState();
  
  const handleCardPress = (item) => {
    router.push(`/game-details/${item._id}`);
    setSelectedGame(item._id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Releases</Text>
        <TouchableOpacity>
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