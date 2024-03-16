import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import { ReviewFooter, ScreenHeaderBtn, Logo, Header, TextInput, Button} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import inputValidator from "../../helpers/inputValidator";
import {isLoggedIn, logIn} from "../../helpers/loginSession";

export const SignUp = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const { data , isLoading, error, refetch, totalPages, fetchData } = useFetch(`auth/signup`, null, false, {
      email: email.value, 
      name: name.value,
      password: password.value
    });

    const onSignUpPressed = async () => {
      const emailError = inputValidator(email.value, 'email')
      const passwordError = inputValidator(password.value, 'password')
      const nameError = inputValidator(name.value, 'empty')

      if (emailError || passwordError || nameError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        setName({ ...name, error: nameError })
        return
      }

      const responseData = await fetchData();

      if(responseData && responseData.isSuccess){
          if(await logIn(responseData)){
            if(params && params.redirectUrl){
              router.replace({pathname: params.redirectUrl, params: {...params}});
            }
            else{
              router.replace('/');
            }
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
              <Header>Create Account</Header>
                <TextInput
                  label="Name"
                  returnKeyType="next"
                  value={name.value}
                  onChangeText={(text) => setName({ value: text, error: '' })}
                  error={!!name.error}
                  errorText={name.error}
                />
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
                <Button mode="contained" onPress={onSignUpPressed}>
                  Register
                </Button>
                <View style={styles.row}>
                  <Text>Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                    <Text style={styles.link}>Login</Text>
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


export default SignUp