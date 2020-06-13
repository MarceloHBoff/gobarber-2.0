import React, { useRef, useCallback } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ContainerAdapter from '../../components/ContainerAdapter';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
  SignOutButton,
  SignOutButtonText,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updatedUser, signOut } = useAuth();
  const { goBack } = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('E-mail is required')
          .email('Type a valid e-mail'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: value => !!value.length,
          then: Yup.string().required('New password is required'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: value => !!value.length,
            then: Yup.string().required('Password confirmation is required'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), null], 'Password must match'),
      });

      await schema.validate(data, { abortEarly: false });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? {
              old_password,
              password,
              password_confirmation,
            }
          : {}),
      };

      const response = await api.put('/profile', formData);

      await updatedUser(response.data);

      Alert.alert('Updated profile success');

      goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Error', 'Error in update profile');
    }
  }, []);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Select avatar',
        cancelButtonTitle: 'Cancel',
      },
      async response => {
        if (response.didCancel) return;

        if (response.error) {
          Alert.alert('Error in select avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: response.type,
          uri: String(response.uri),
          name: `${user.id}.jpg`,
        });
        console.log(response.uri);

        try {
          const responsed = await api.patch('/users/avatar', data);
          console.log(responsed.status);
          console.log(responsed.data);
        } catch (err) {
          console.log(err);
        }
        // .then(apiResponse => updatedUser(apiResponse.data));
      },
    );
  }, []);

  return (
    <>
      <ContainerAdapter>
        <Container>
          <BackButton onPress={goBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <UserAvatarButton onPress={handleUpdateAvatar}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>

          <View>
            <Title>My profile</Title>
          </View>

          <Form
            initialData={{ name: user.name, email: user.email }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
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
              onSubmitEditing={() => oldPasswordInputRef.current.focus()}
            />

            <Input
              ref={oldPasswordInputRef}
              containerStyle={{ marginTop: 20 }}
              secureTextEntry
              name="old_password"
              icon="lock"
              placeholder="Old password"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="New password"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordConfirmationInputRef.current.focus()
              }
            />
            <Input
              ref={passwordConfirmationInputRef}
              secureTextEntry
              name="password_confirmation"
              icon="lock"
              placeholder="Password confirmation"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Confirm changes
            </Button>

            <SignOutButton onPress={signOut}>
              <SignOutButtonText>SignOut</SignOutButtonText>
            </SignOutButton>
          </Form>
        </Container>
      </ContainerAdapter>
    </>
  );
};

export default Profile;
