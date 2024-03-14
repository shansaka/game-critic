import React from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'

import { Game, ReviewFooter, ScreenHeaderBtn} from '../../components';
import { COLORS, icons, SIZES, images } from '../../constants';
import useFetch from '../../hook/useFetch';


export const AddReview = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    //const { data, isLoading, error, refetch } = useFetch(`games/${params.id}`);

    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          // headerRight: () => (
          //   <ScreenHeaderBtn 
          //     iconUrl={images.account} 
          //     dimension="100%" 
          //     handlePress={() => router.push({pathname: `auth/login`})}
          //   />
          // ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Game data={params}/>

            </View>
        </ScrollView>

        <ReviewFooter item={params} />
      </>
    </SafeAreaView>
    )
}

export default AddReview