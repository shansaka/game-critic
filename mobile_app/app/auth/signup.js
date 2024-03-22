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
import useFetch from "../../hook/useFetch";

export const SignUp = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    isRedirect: false,
  });

  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `auth/signup`,
    null,
    false,
    {
      email: email.value,
      name: name.value,
      password: password.value,
    }
  );

  // When the user presses the signup button
  const onSignUpPressed = async () => {
    const emailError = inputValidator(email.value, "email");
    const passwordError = inputValidator(password.value, "password");
    const nameError = inputValidator(name.value, "empty");

    if (emailError || passwordError || nameError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setName({ ...name, error: nameError });
      return;
    }

    const responseData = await fetchData();

    if (responseData && responseData.isSuccess) {
      setShowAlert({
        show: true,
        message:
          "Account created successfully, Please confirm your email address.",
        isRedirect: true,
      });
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
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Logo />
              <Header>Create Account</Header>
              <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
              />
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
              <Button mode="contained" onPress={onSignUpPressed}>
                Register
              </Button>
              <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.replace("/auth/login")}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <AwesomeAlert
          style={{ width: "100%", height: "100%", position: "absolute" }}
          show={showAlert.show}
          showProgress={false}
          //title="Error!"
          message={showAlert.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Okay, Got it!"
          confirmButtonColor={COLORS.gray}
          confirmButtonStyle={styles.alertButton}
          onConfirmPressed={() => {
            setShowAlert(false);
            if (showAlert.isRedirect) {
              router.replace("/auth/login");
            }
          }}
          onDismiss={() => {
            setShowAlert(false);
            if (showAlert.isRedirect) {
              router.replace("/auth/login");
            }
          }}
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

export default SignUp;
