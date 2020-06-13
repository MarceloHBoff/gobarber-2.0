import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 0 30px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background: #3e3b47;
  border-radius: 10px;
  margin-top: 30px;

  justify-content: center;
  align-items: center;
`;

export const SignOutButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 18px;
`;
