import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { router, useRouter } from 'expo-router'
import styles from './welcome.style'

import { icons, SIZES } from '../../../constants'
import {getSessionItem, isLoggedIn} from "../../../helpers/loginSession";


const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const fetchDisplayName = async () => {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
            const name = await getSessionItem('userDisplayName');
            setDisplayName(name);
        }
    };

        fetchDisplayName();
    }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}> Hello {displayName ? displayName : ""}</Text>
        <Text style={styles.welcomeMessage}> Welcome to the Game Critic </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='Search by name of the game'
            onChange={() => {}}
          >
          </TextInput>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image 
          source={icons.search} 
          style={styles.searchBtnImage}
          resizeMode='contain'
           />
        </TouchableOpacity>
        </View>

        {/* <View style={styles.tabsContainer}>
          <FlatList
            data={jobTypes}
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
    </View>

    
  )
}

export default Welcome