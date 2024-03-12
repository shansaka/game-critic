import React from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { checkImageURL } from '../../../../utils'

import styles from './newgamecard.style'

const NewGameCard = ({item, selected, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selected, item)}
      onPress={() => handleCardPress(item)}
    >
      <View
        style={styles.logoContainer(selected, item)}
      >
        <Image 
          source={{uri: 
            item.mainImage
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </View>

      <View style={styles.gameTitleBox}>
            <Text style={styles.rating(item.avgRating)}>{item.avgRating}</Text>
            <Text style={styles.gameTitle(selected, item)} numberOfLines={1}>{item.name}</Text> 
        </View>
    </TouchableOpacity>
  )
}

export default NewGameCard