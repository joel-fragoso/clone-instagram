import styled from 'styled-components/native';

import { Props } from '.';

export const Small = styled.ImageBackground<Props>`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;

export const Original = styled.Image<Props>`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;
