import { useCallback, useState } from 'react'
import { View, Text, ActivityIndicator, Touchable, TouchableOpacity} from "react-native";
import useFetch from "../../../hook/useFetch";
import styles from "./review.style";
import { COLORS } from "../../../constants";
import { checkImageURL } from "../../../utils";
import ReviewCard from "../../common/cards/review/ReviewCard";

const GameReview = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { pageNo: currentPage };
  const { data: reviews, isLoading, error, refetch, totalPages } = useFetch(`reviews/game/${data._id}`, paramsWithPageNo, true);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

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
      <TouchableOpacity style={styles.button} onPress={() => loadMoreItem()}>
        <Text> Load More </Text>
      </TouchableOpacity>
    </View>
  );
};


export default GameReview;

