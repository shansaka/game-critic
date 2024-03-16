import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Stack,
  useRouter,
  useLocalSearchParams,
  useFocusEffect,
} from "expo-router";

import {
  ReviewFooter,
  ScreenHeaderBtn,
  Logo,
  Header,
  TextInput,
  Button,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { logOut } from "../../helpers/loginSession";

export const Login = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onLoginPressed = async () => {
    setIsLoading(true);
    if (await logOut()) {
      router.replace("/");
    } else {
      setError("Failed to logout");
    }
    setIsLoading(false);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Logo />
              <Header>Welcome back.</Header>
              <Button mode="contained" onPress={onLoginPressed}>
                Logout
              </Button>
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: COLORS.secondary,
  },
  link: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default Login;
