import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";

import {
  Game,
  ReviewFooter,
  ScreenHeaderBtn,
  TextInput,
} from "../../components";
import { COLORS, icons, SIZES, images } from "../../constants";
import useFetch from "../../hook/useFetch";
import { Rating } from "react-native-ratings";

export const AddReview = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState({ value: "", error: "" });
  const [comments, setComments] = useState({ value: "", error: "" });
  const [rating, setRating] = useState(5);
  const scrollViewRef = useRef();

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

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
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),

          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Game data={params} />
            <Rating
              showRating
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
              ratingTextColor={COLORS.primary}
              ratingBackgroundColor={COLORS.lightWhite}
              minValue={1}
              startingValue={5}
            />
            <TextInput
              label="Title"
              returnKeyType="next"
              value={title.value}
              onChangeText={(text) => setTitle({ value: text, error: "" })}
              error={!!title.error}
              errorText={title.error}
              autoCapitalize="none"
              autoCompleteType="title"
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }, 300);
              }}
              // textContentType="title"
              // keyboardType="title"
            />

            <TextInput
              label="Comments"
              returnKeyType="next"
              value={comments.value}
              onChangeText={(text) => setComments({ value: text, error: "" })}
              error={!!comments.error}
              errorText={comments.error}
              multiline={true}
              numberOfLines={4}
              autoCapitalize="none"
              autoCompleteType="comments"
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }, 300);
              }}
              // textContentType="title"
              // keyboardType="title"
            />
          </View>
        </ScrollView>

        <ReviewFooter
          gameId={params._id}
          title={title.value}
          comments={comments.value}
          rating={rating}
          setTitle={setTitle}
          setComments={setComments}
        />
      </>
    </SafeAreaView>
  );
};

export default AddReview;
