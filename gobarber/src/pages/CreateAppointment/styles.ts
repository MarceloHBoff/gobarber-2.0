import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Provider } from '../Dashboard';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  background: #28262e;
  padding: 24px;
  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 24}px;
  `}

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

interface ProviderProps {
  selected: boolean;
}

export const ProviderContainer = styled.TouchableOpacity<ProviderProps>`
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  padding: 8px 12px;
  margin-right: 16px;

  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderProps>`
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
  font-size: 16px;
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const OpenCalendarButton = styled.TouchableOpacity`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 24px;
`;

export const OpenCalendarButtonText = styled.Text`
  font-size: 16px;
  color: #232129;
  font-family: 'RobotoSlab-Medium';
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 0 24px 24px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

interface HourProps {
  selected: boolean;
  available: boolean;
}

export const Hour = styled.TouchableOpacity<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;

interface HourTextProps {
  selected: boolean;
}

export const HourText = styled.Text<HourTextProps>`
  font-size: 16px;
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAppointmentButton = styled.TouchableOpacity`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-size: 18px;
  color: #232129;
  font-family: 'RobotoSlab-Medium';
`;
