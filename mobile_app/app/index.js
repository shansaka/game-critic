import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES, FONTS } from '../constants';
import { AllGames, NewGames, ScreenHeaderBtn, Welcome } from '../components'

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen options={{
        headerStyle: {backgroundColor: COLORS.lightWhite},
        headerShadowVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>
        ),
        headerTitle: ""
      }}/>

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{flex: 1, padding: SIZES.medium}}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                 router.push({ pathname: `/search/search`, params: { search: 'all', searchTitle: `Find "${searchTerm}"`, searchTerm: searchTerm }})
              }
            }}
          />
          <NewGames />
          <AllGames />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;