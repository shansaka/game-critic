import React from "react";
import { View, Text, ActivityIndicator} from "react-native";
import useFetch from "../../../hook/useFetch";
import styles from "./review.style";
import { COLORS } from "../../../constants";
import { checkImageURL } from "../../../utils";
import ReviewCard from "../../common/cards/review/ReviewCard";

const GameReview = ({ data }) => {
  const { data: reviews, isLoading, error } = useFetch(`reviews/game/${data._id}`);
  console.log(reviews);

  return (
    <View style={styles.container}>
      <View >
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          reviews?.map((item) => (
            <ReviewCard 
              item={item}
              key={`review-${item._id}`}
             />
          ))
        )}
      </View>
    </View>
  );
};


export default GameReview;

