import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { Rating } from "react-native-ratings";
import {
  Game,
  ReviewFooter,
  ScreenHeaderBtn,
  TextInput,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";

export const AddReview = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState({ value: "", error: "" });
  const [comments, setComments] = useState({ value: "", error: "" });
  const [rating, setRating] = useState(5);
  const scrollViewRef = useRef();

  // When user finishes rating
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
              maxLength={50}
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }, 300);
              }}
            />

            <TextInput
              label="Comments"
              returnKeyType="next"
              value={comments.value}
              onChangeText={(text) => setComments({ value: text, error: "" })}
              error={!!comments.error}
              errorText={comments.error}
              maxLength={500}
              multiline={true}
              numberOfLines={4}
              autoCapitalize="none"
              autoCompleteType="comments"
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }, 300);
              }}
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
