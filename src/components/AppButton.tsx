import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle,
} from 'react-native';

type AppButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'edit' | 'danger';
    style?: StyleProp<ViewStyle>;
};

export default function AppButton({
    title,
    onPress,
    variant = 'primary',
    style,
}: AppButtonProps) {
    return (
        <Pressable
            style={[
                styles.button,
                variant === 'edit' && styles.edit,
                variant === 'danger' && styles.danger,
                style,
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1d75cd',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    edit: {
        backgroundColor: '#f97316',
    },

    danger: {
        backgroundColor: '#dc2626',
    },

    text: {
        color: '#ffffff',
        fontWeight: '700',
    },
});