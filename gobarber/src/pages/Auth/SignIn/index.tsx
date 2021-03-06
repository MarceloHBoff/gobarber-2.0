import React, { useRef, useCallback } from 'react';
import { Image, View, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../../assets/logo.png';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ContainerAdapter from '../../../components/ContainerAdapter';

import getValidationErrors from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';

import { ForgotPassword, ForgotPasswordText } from './styles';

import {
  Container,
  Title,
  FooterButton,
  FooterButtonText,
} from '../AuthStyles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type a valid e-mail'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Error in SignIn', 'Email or password is invalid!');
      }
    },
    [signIn],
  );

  return (
    <>
      <ContainerAdapter>
        <Container>
          <Image source={logo} />

          <View>
            <Title>SignIn</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Password"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              SignIn
            </Button>
          </Form>

          <ForgotPassword>
            <ForgotPasswordText>Forgot my password</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ContainerAdapter>

      <FooterButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <FooterButtonText>Create account</FooterButtonText>
      </FooterButton>
    </>
  );
};

export default SignIn;
