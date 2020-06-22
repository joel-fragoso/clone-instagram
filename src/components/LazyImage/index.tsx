import React, { FC, useState, useEffect } from 'react';
import { Animated } from 'react-native';

import {
  Small,
  Original,
} from './styles';

export interface Props {
  source: any;
  ratio: any;
  smallSource?: any;
  shouldLoad?: any;
}

const OriginalAnimated = Animated.createAnimatedComponent(Original);

const LazyImage: FC<Props> = ({
  source,
  ratio,
  smallSource,
  shouldLoad
}) => {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={smallSource}
      ratio={ratio}
      resizeMode="contain"
      blurRadius={2}
    >
      <OriginalAnimated
        style={{ opacity }}
        source={source}
        ratio={ratio}
        resizeMode='contain'
        onLoadEnd={handleAnimate}
      />
    </Small>
  );
};

export default LazyImage;
