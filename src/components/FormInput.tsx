import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View
} from 'react-native';

type FormInputProps = TextInputProps & {
    label: string;
};

export default function FormInput({
    label,
    ...props
}: FormInputProps) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={styles.input}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginTop: 18,
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        width: '100%',
        padding: 12,
        fontSize: 16,
    },
});