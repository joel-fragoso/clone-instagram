import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;

  border-radius: 16px;
`;

export const Name = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  color: #333;
`;

export const PostImage = styled.Image`
  width: 100%;
  aspect-ratio: 0.840;
`;

export const Description = styled.Text`
  padding: 15px;
  line-height: 18px;
`;