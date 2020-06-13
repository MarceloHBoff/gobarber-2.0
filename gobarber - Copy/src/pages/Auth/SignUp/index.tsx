import React, { useRef, useCallback } from 'react';
import { Image, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import logo from '../../../assets/logo.png';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ContainerAdapter from '../../../components/ContainerAdapter';

import {
  Container,
  Title,
  FooterButton,
  FooterButtonText,
} from '../AuthStyles';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('E-mail is required')
          .email('Type a valid e-mail'),
        password: Yup.string()
          .required('E-mail is required')
          .min(6, 'Need at least 6 characters'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('users', data);

      Alert.alert('SignUp Success', 'SignIn to enjoy the GoBarber');

      navigation.navigate('SignIn');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Error in SignUp', 'Erro');
    }
  }, []);

  return (
    <>
      <ContainerAdapter>
        <Container>
          <Image source={logo} />

          <View>
            <Title>Create your account</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Name"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current.focus()}
            />
            <Input
              ref={emailInputRef}
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
              Register
            </Button>
          </Form>
        </Container>
      </ContainerAdapter>

      <FooterButton onPress={() => navigation.navigate('SignIn')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <FooterButtonText>Back to SignIn</FooterButtonText>
      </FooterButton>
    </>
  );
};

export default SignUp;
