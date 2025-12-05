import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import React, { memo, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Variants = 'solid' | 'outline' | 'ghost';
type Sizes = 'sm' | 'md' | 'lg';

type Props = PropsWithChildren<{
  title: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  minWidth?: number;
  variant?: Variants;
  size?: Sizes;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  style?: any;
  textSize?: number;
  textStyle?: any;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  iconPosition?: 'left' | 'right';
  iconLeftName?: string;
  iconRightName?: string;
  testID?: string;

  // >>> NUEVO: gradiente
  useGradient?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
}>;

const PRIMARY = '#5A35B8';

const Button = memo(function Button({
  title,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  fullWidth = false,
  variant = 'solid',
  size = 'md',
  color = PRIMARY,
  backgroundColor,
  textColor,
  borderRadius = 12,
  borderColor,
  borderWidth,
  paddingVertical,
  paddingHorizontal,
  style,
  textStyle,
  textSize,
  icon,
  minWidth,
  iconColor,
  iconSize = 20,
  iconPosition = 'left',
  iconLeftName,
  iconRightName,
  testID,
  children,
  useGradient = false,
  gradientColors,
  gradientStart,
  gradientEnd,
}: Props) {
  const resolved = useMemo(() => {
    const sizes = {
      sm: { pv: 8, ph: 12, fs: 14, gap: 6 },
      md: { pv: 12, ph: 18, fs: 16, gap: 8 },
      lg: { pv: 14, ph: 22, fs: 18, gap: 10 },
    } as const;
    const sz = sizes[size];

    const palette = {
      solid: {
        bg: backgroundColor ?? color,
        borderColor: borderColor ?? (backgroundColor ? backgroundColor : color),
        borderWidth: borderWidth ?? 0,
        text: textColor ?? '#FFFFFF',
      },
      outline: {
        bg: backgroundColor ?? 'transparent',
        borderColor: borderColor ?? color,
        borderWidth: borderWidth ?? 1,
        text: textColor ?? color,
      },
      ghost: {
        bg: backgroundColor ?? 'transparent',
        borderColor: borderColor ?? 'transparent',
        borderWidth: borderWidth ?? 0,
        text: textColor ?? color,
      },
    } as const;

    const paletteForVariant = palette[variant];

    return {
      // estilos del contenedor "presionable"
      container: {
        backgroundColor: useGradient ? 'transparent' : paletteForVariant.bg,
        borderColor: paletteForVariant.borderColor,
        borderWidth: paletteForVariant.borderWidth,
        borderRadius,
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : undefined,
        minWidth: minWidth ?? undefined,
        overflow: 'hidden', // importante para que el gradiente respete las esquinas
      },
      // padding va dentro del contenido
      inner: {
        paddingVertical: paddingVertical ?? sz.pv,
        paddingHorizontal: paddingHorizontal ?? sz.ph,
      },
      text: {
        color: paletteForVariant.text,
        fontWeight: 'bold',
        fontSize: textSize ?? sz.fs,
      },
      gap: sz.gap,
    };
  }, [
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    color,
    disabled,
    fullWidth,
    minWidth,
    paddingHorizontal,
    paddingVertical,
    size,
    textColor,
    variant,
    textSize,
    useGradient,
  ]);

  const leftName = iconLeftName ?? (iconPosition === 'left' ? icon : undefined);
  const rightName = iconRightName ?? (iconPosition === 'right' ? icon : undefined);
  const icColor = iconColor ?? resolved.text.color;

  const defaultContent = (
    <View style={[styles.row, { gap: resolved.gap }]}>
      {leftName ? <IconSymbol name={leftName as any} size={iconSize} color={icColor} /> : null}
      <Text style={[resolved.text, textStyle]} numberOfLines={1}>
        {title}
      </Text>
      {rightName ? <IconSymbol name={rightName as any} size={iconSize} color={icColor} /> : null}
    </View>
  );

  // Si pasas children, los usamos; si no, usamos el contenido por defecto
  const content = children ? children : defaultContent;

  return (
    <Pressable
      android_ripple={{ color: '#00000022' }}
      onPress={disabled || loading ? undefined : onPress}
      onLongPress={disabled || loading ? undefined : onLongPress}
      disabled={disabled}
      style={[styles.button, resolved.container, style]}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={resolved.text.color} />
      ) : useGradient ? (
        <LinearGradient
          colors={gradientColors ?? ['#A855F7', '#8B5CF6']}
          start={gradientStart ?? { x: 0, y: 0.5 }}
          end={gradientEnd ?? { x: 1, y: 0.5 }}
           style={[styles.gradient, resolved.inner]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.inner, resolved.inner]}>{content}</View>
      )}
    </Pressable>
  );
});
export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
   gradient: {
    flex: 1,
    width: '100%',           // 👈 hace que el degradado ocupe todo el ancho
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
