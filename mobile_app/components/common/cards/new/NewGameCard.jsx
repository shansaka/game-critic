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
      <TouchableOpacity
        style={styles.logoContainer(selected, item)}
      >
        <Image 
          source={{uri: 
            item.mainImage
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
            <Text style={styles.rating(item.rating)}>{item.rating ? item.rating : 5}</Text>
            <Text style={styles.gameName(selected, item)} numberOfLines={1}>{item.name}</Text> 
        </View>
    </TouchableOpacity>
  )
}

export default NewGameCard