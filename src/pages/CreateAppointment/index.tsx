import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Title,
  Calendar,
} from './styles';
// import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  // const { user } = useAuth();
  // const route = useRoute();
  // const navigation = useNavigation();

  // const { providerId } = route.params as RouteParams;

  // const [providers, setProviders] = useState<Provider[]>([]);
  // const [selectedProvider, setSelectedProvider] = useState(providerId);

  // useEffect(() => {
  //   (async () => {
  //     const response = await api.get('/providers');

  //     setProviders(response.data);
  //   })()
  // }, []);

  // const navigateBack = useCallback(() => {
  //   navigation.goBack();
  // }, []);

  // const handleSelectProvider = useCallback((provider_id: string) => {
  //   setSelectedProvider(provider_id);
  // }, []);

  return (
    <Container>
      {/* <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName
                selected={provider.id === selectedProvider}
              >
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>
        <DateTimePicker
          value={new Date()}
          textColor="#f4ede8"
          mode="date"
          display="calendar"
        />
      </Calendar> */}
    </Container>
  )
}

export default CreateAppointment;
