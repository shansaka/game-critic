import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { router, useRouter } from 'expo-router'
import styles from './welcome.style'

import { icons, SIZES } from '../../../constants'

const Welcome = () => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}> Hello Salindu </Text>
        <Text style={styles.welcomeMessage}> Welcome to the Job Portal </Text>
      </View>
      
    </View>
  )
}

export default Welcome