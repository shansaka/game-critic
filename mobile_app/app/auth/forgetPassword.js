import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AwesomeAlert from "react-native-awesome-alerts";
import {
  Button,
  Header,
  Logo,
  ScreenHeaderBtn,
  TextInput,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import inputValidator from "../../helpers/inputValidator";
import { logIn } from "../../helpers/loginSession";
import useFetch from "../../hook/useFetch";

export const ForgetPassword = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [showAlert, setShowAlert] = useState({ show: false, message: "" });

  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `auth/login`,
    null,
    false,
    { email: email.value, password: password.value }
  );

  // When the user presses the login button
  const onLoginPressed = async () => {
    const emailError = inputValidator(email.value, "email");
    const passwordError = inputValidator(password.value, "password");

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    // Call the login API
    const responseData = await fetchData();
    if (responseData && responseData.isSuccess) {
      // If the login is successful, save the user data in the session
      if (await logIn(responseData)) {
        // Redirect the user to the home page, if redirectUrl is provided in the params then redirect the user to that page
        if (params && params.redirectUrl) {
          router.replace({
            pathname: params.redirectUrl,
            params: { ...params },
          });
        } else {
          router.replace("/");
        }
      }
    } else if (responseData && responseData.message) {
      setShowAlert({ show: true, message: responseData.message });
    } else {
      setShowAlert({ show: true, message: "Something went wrong" });
    }
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
              <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
              />
              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                  <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <Button mode="contained" onPress={onLoginPressed}>
                Reset Password
              </Button>
            </View>
          )}
        </ScrollView>
        <AwesomeAlert
          style={{ width: "100%", height: "100%", position: "absolute" }}
          show={showAlert.show}
          showProgress={false}
          title="Error!"
          message={showAlert.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Okay, Got it!"
          confirmButtonColor={COLORS.gray}
          confirmButtonStyle={styles.alertButton}
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
          onDismiss={() => {}}
        />
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

export default ForgetPassword;