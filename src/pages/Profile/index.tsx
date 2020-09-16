import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  UserAvatar,
  UserAvatarButton,
  BackButton
} from './styles';
import { useAuth } from '../../hooks/auth';

interface UpdateUserData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);

  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { user, updateUser } = useAuth();

  const handleUpdateUser = useCallback(
    async (data: UpdateUserData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: yup.string(),
          password: yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: yup.string().required('Campo obrigatório'),
            otherwise: yup.string(),
          }),
          password_confirmation: yup
            .string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: yup.string().required('Campo obrigatório'),
              otherwise: yup.string(),
            })
            .oneOf([yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

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
          ...(data.old_password
            ? {
              old_password: data.old_password,
              password,
              password_confirmation,
            }
            : {}),
        };
        const response = await api.put('profile', formData);

        Alert.alert(
          'Perfil Atualizado com sucesso',
        );

        updateUser(response.data);
        navigation.goBack();

      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar perfil'
        );

        navigation.goBack();
      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'User câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, response => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar');
        return;
      }

      const source = { uri: response.uri };

      console.log(source);
    });
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar} >
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleUpdateUser} style={{ width: '100%' }} >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="old_password"
                icon="lock"
                containerStyles={{
                  marginTop: 24
                }}
                placeholder="Senha atual"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus()
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm()
              }} >Confirmar mudanças</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
export default Profile;
