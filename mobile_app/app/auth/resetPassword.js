import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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

export const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });
  const [showAlert, setShowAlert] = useState({ show: false, message: "" });

  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `auth/reset-password`,
    null,
    false,
    {
      email: email.value,
      newPassword: newPassword.value,
    }
  );

  // When the user presses the reset password button
  const onResetPasswordPressed = async () => {
    const emailError = inputValidator(email.value, "email");
    const newPasswordError = inputValidator(newPassword.value, "password");

    if (emailError || newPasswordError) {
      setEmail({ ...email, error: emailError });
      setNewPassword({ ...newPassword, error: newPasswordError });
      return;
    }

    const responseData = await fetchData();

    if (responseData && responseData.isSuccess) {
      setShowAlert({
        show: true,
        message:
          "Password reset successfully, Please confirm your email address.",
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
              <Header>Reset Password</Header>
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
                label="New Password"
                returnKeyType="done"
                value={newPassword.value}
                onChangeText={(text) =>
                  setNewPassword({ value: text, error: "" })
                }
                error={!!newPassword.error}
                errorText={newPassword.error}
                secureTextEntry
              />
              <Button mode="contained" onPress={onResetPasswordPressed}>
                Reset Password
              </Button>
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

export default ResetPassword;
