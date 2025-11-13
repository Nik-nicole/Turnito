// components/animations/SplashAnimation.tsx
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  visible: boolean;
  onFinish?: () => void;
  logoSource?: any; // require('../assets/...') o cualquier source válido
  backgroundColor?: string;
  style?: ViewStyle;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function SplashAnimation({
  visible,
  onFinish,
  logoSource = require('../../assets/images/Logo.png'),
  backgroundColor = '#8C52FF',
  style,
}: Props) {
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const loopAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (!visible) return;

    // Construimos el loop de "jump"
    const jump = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -24,
            duration: 280,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.06,
            duration: 280,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 380,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 380,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    loopAnimRef.current = jump;
    jump.start();

    // Al cabo de X ms hacemos fade out (igual que en tu RootLayout)
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        // Paramos el loop y notificamos al padre
        if (loopAnimRef.current) loopAnimRef.current.stop();
        onFinish?.();
      });
    }, 1600);

    return () => {
      clearTimeout(timer);
      if (loopAnimRef.current) loopAnimRef.current.stop();
    };
  }, [visible, onFinish, opacity, scale, translateY]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { backgroundColor, opacity }, style]}>
      <AnimatedImage
        source={logoSource}
        style={[styles.splashLogo, { transform: [{ translateY }, { scale }] }]}
        contentFit="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 200,
    height: 200,
  },
});
