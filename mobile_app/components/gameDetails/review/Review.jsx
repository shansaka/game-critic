import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import ReviewCard from "../../common/cards/review/ReviewCard";
import styles from "./review.style";

const GameReview = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { pageNo: currentPage };
  const {
    data: reviews,
    isLoading,
    error,
    refetch,
    totalPages,
    fetchData,
  } = useFetch(`reviews/game/${data._id}`, paramsWithPageNo, true);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <View style={styles.container}>
      <View>
        {reviews?.map((item) => (
          <ReviewCard item={item} key={`review-${item._id}`} />
        ))}
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : null}
      </View>
      {currentPage >= totalPages ? null : (
        <TouchableOpacity
          style={styles.loadMoreBtn}
          onPress={() => loadMoreItem()}
        >
          <Text style={styles.loadMoreText}> Load More Reviews </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GameReview;
