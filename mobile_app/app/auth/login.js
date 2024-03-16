import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import { ReviewFooter, ScreenHeaderBtn, Logo, Header, TextInput, Button} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import inputValidator from "../../helpers/inputValidator";
import {isLoggedIn, logIn} from "../../helpers/loginSession";

export const Login = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const { data , isLoading, error, refetch, totalPages, fetchData } = useFetch(`auth/login`, null, false, {email: email.value, password: password.value});

    const onLoginPressed = async () => {
      const emailError = inputValidator(email.value, 'email')
      const passwordError = inputValidator(password.value, 'password')
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
      }

      const responseData = await fetchData();

      if(responseData && responseData.isSuccess){
          if(await logIn(responseData)){
              router.replace('/');
          }
      }
      else{
          alert('Please check your email and password.');
      }
    }

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
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Logo />
                <Header>Welcome back.</Header>
                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: '' })}
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
                  onChangeText={(text) => setPassword({ value: text, error: '' })}
                  error={!!password.error}
                  errorText={password.error}
                  secureTextEntry
                />
                <View style={styles.forgotPassword}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                  >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>
                <Button mode="contained" onPress={onLoginPressed}>
                  Login
                </Button>
                <View style={styles.row}>
                  <Text>Don’t have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
      </>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: COLORS.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
})


export default Login