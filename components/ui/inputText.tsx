import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { forwardRef, memo, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';

type Variants = 'solid' | 'outline' | 'ghost';
type Sizes = 'sm' | 'md' | 'lg';

type Props = TextInputProps & {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  variant?: Variants;
  size?: Sizes;
  color?: string; // primary color
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  error?: string | boolean;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  iconSize?: number;
  iconColor?: string;
  clearable?: boolean;
  testID?: string;
  minWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  rightIconPress?: () => void;
};

const PRIMARY = '#5A35B8';

const Input = memo(
  forwardRef<TextInput, Props>(function Input(
    {
      label,
      value,
      onChangeText,
      placeholder,
      variant = 'outline',
      size = 'md',
      color = PRIMARY,
      backgroundColor,
      textColor,
      borderRadius = 12,
      borderColor,
      borderWidth,
      disabled = false,
      loading = false,
      fullWidth = false,
      error,
      helperText,
      leftIcon,
      rightIcon,
      rightIconPress,
      iconSize = 20,
      iconColor,
      clearable = true,
      style,
      containerStyle,
      testID,
      minWidth,
      multiline,
      numberOfLines,
      secureTextEntry,
      placeholderTextColor: placeholderTextColorProp,
      ...rest
    },
    ref
  ) {
    const [internalValue, setInternalValue] = useState<string>(value ?? '');

    // keep internalValue in sync if controlled
    React.useEffect(() => {
      if (value !== undefined && value !== internalValue) setInternalValue(value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const resolved = useMemo(() => {
      const sizes = {
        sm: { ph: 10, pv: 8, fs: 14, height: 36, gap: 6 },
        md: { ph: 12, pv: 12, fs: 16, height: 44, gap: 8 },
        lg: { ph: 14, pv: 14, fs: 18, height: 52, gap: 10 },
      } as const;
      const sz = sizes[size];

      const palette = {
        solid: {
          bg: backgroundColor ?? color,
          borderColor: borderColor ?? (backgroundColor ? backgroundColor : color),
          borderWidth: borderWidth ?? 0,
          text: textColor ?? '#FFFFFF',
          placeholder: '#EFEFEF',
        },
        outline: {
          bg: backgroundColor ?? 'transparent',
          borderColor: borderColor ?? color,
          borderWidth: borderWidth ?? 1,
          text: textColor ?? (color ?? PRIMARY),
          placeholder: '#A9A9A9',
        },
        ghost: {
          bg: backgroundColor ?? 'transparent',
          borderColor: borderColor ?? 'transparent',
          borderWidth: borderWidth ?? 0,
          text: textColor ?? (color ?? PRIMARY),
          placeholder: '#A9A9A9',
        },
      } as const;

      const base = palette[variant];

      const hasError = Boolean(error);
      const finalBorderColor = hasError ? '#E02424' : base.borderColor;
      const finalTextColor = base.text;
      const finalPlaceholder = base.placeholder;

      return {
        container: {
          backgroundColor: base.bg,
          borderRadius,
          borderColor: finalBorderColor,
          borderWidth: base.borderWidth,
          paddingHorizontal: sz.ph,
          paddingVertical: multiline ? 10 : sz.pv,
          minHeight: multiline ? undefined : sz.height,
          alignSelf: fullWidth ? ('stretch' as const) : undefined,
          opacity: disabled ? 0.6 : 1,
          flexDirection: 'row' as const,
          alignItems: multiline ? 'flex-start' as const : 'center' as const,
          minWidth: minWidth ?? undefined,
        },
        input: {
          color: finalTextColor,
          fontSize: sz.fs,
          flex: 1,
          padding: 0,
          margin: 0,
          textAlignVertical: multiline ? 'top' as const : 'center' as const,
        },
        placeholder: finalPlaceholder,
        gap: sz.gap,
        iconColor: iconColor ?? finalTextColor,
      };
    }, [
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      color,
      disabled,
      fullWidth,
      multiline,
      size,
      textColor,
      variant,
      iconColor,
      minWidth,
      error,
    ]);

    const handleClear = () => {
      setInternalValue('');
      onChangeText?.('');
    };

    const showClear = clearable && !!internalValue && !disabled && !loading;

    return (
      <View style={[{ alignSelf: fullWidth ? ('stretch' as const) : undefined }, containerStyle]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View style={[styles.wrapper, resolved.container]} testID={testID}>
          {/* Left icon */}
          {leftIcon ? (
            <View style={{ marginRight: resolved.gap }}>
              <IconSymbol name={leftIcon as any} size={iconSize} color={resolved.iconColor} />
            </View>
          ) : null}

          {/* TextInput */}
          <TextInput
            ref={ref}
            value={internalValue}
            onChangeText={(t) => {
              setInternalValue(t);
              onChangeText?.(t);
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColorProp ?? resolved.placeholder}
            style={[resolved.input, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null, style]}
            editable={!disabled}
            multiline={multiline}
            numberOfLines={numberOfLines}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid="transparent"
            {...rest}
          />

          {/* Loading indicator */}
          {loading ? (
            <ActivityIndicator style={{ marginLeft: resolved.gap }} color={resolved.iconColor} />
          ) : null}

          {/* Clear button */}
          {showClear ? (
            <Pressable onPress={handleClear} style={styles.iconPressable}>
              <IconSymbol name={'xmark'} size={iconSize} color={resolved.iconColor} />
            </Pressable>
          ) : null}

          {/* Right icon (if provided and not using clear) */}
          {!loading && !showClear && rightIcon ? (
            rightIconPress ? (
              <Pressable onPress={rightIconPress} style={{ marginLeft: resolved.gap }}>
                <IconSymbol name={rightIcon as any} size={iconSize} color={resolved.iconColor} />
              </Pressable>
            ) : (
              <View style={{ marginLeft: resolved.gap }}>
                <IconSymbol name={rightIcon as any} size={iconSize} color={resolved.iconColor} />
              </View>
            )
          ) : null}
        </View>

        {/* Helper or error text */}
        {(error || helperText) ? (
          <Text style={[styles.helper, error ? styles.errorText : null]}>
            {typeof error === 'string' ? error : helperText}
          </Text>
        ) : null}
      </View>
    );
  })
);

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginBottom: 6,
    color: '#222',
    fontWeight: '600',
    fontSize: 13,
  },
  helper: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    color: '#E02424',
  },
  iconPressable: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
