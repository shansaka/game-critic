import React from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity, Image } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'

import { ScreenHeaderBtn, AllGameCard} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import styles from './searchstyle'


export const GameDetails = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { data, isLoading, error, refetch } = useFetch(`games`, params);
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

    
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension='60%'
                        handlePress={() => router.back()}
                    />
                ),
                headerTitle: "",
            }}
        />

        <FlatList
            data={data}
            renderItem={({ item }) => (
                <AllGameCard
                    item={item}
                    handleNavigate={() => router.push({pathname: `gameDetails/${item._id}`})}
                />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
            ListHeaderComponent={() => (
                <>
                    <View style={styles.container}>
                        <Text style={styles.searchTitle}>{params.searchTitle}</Text>
                        <Text style={styles.searchGame}>Games</Text>
                    </View>
                    <View style={styles.loaderContainer}>
                        {isLoading ? (
                            <ActivityIndicator size='large' color={COLORS.primary} />
                        ) : error && (
                            <Text>Oops something went wrong</Text>
                        )}
                    </View>
                </>
            )}
            // ListFooterComponent={() => (
            //     <View style={styles.footerContainer}>
            //         <TouchableOpacity
            //             style={styles.paginationButton}
            //             onPress={() => handlePagination('left')}
            //         >
            //             <Image
            //                 source={icons.chevronLeft}
            //                 style={styles.paginationImage}
            //                 resizeMode="contain"
            //             />
            //         </TouchableOpacity>
            //         <View style={styles.paginationTextBox}>
            //             <Text style={styles.paginationText}>{page}</Text>
            //         </View>
            //         <TouchableOpacity
            //             style={styles.paginationButton}
            //             onPress={() => handlePagination('right')}
            //         >
            //             <Image
            //                 source={icons.chevronRight}
            //                 style={styles.paginationImage}
            //                 resizeMode="contain"
            //             />
            //         </TouchableOpacity>
            //     </View>
            // )}
        />
    </SafeAreaView>
    )
}

export default GameDetails