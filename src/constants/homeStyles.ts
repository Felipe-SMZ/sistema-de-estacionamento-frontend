import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7fafc',
        justifyContent: 'center',
        padding: 24,
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 24,
        elevation: 3,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
        lineHeight: 22,
    },

    buttonContainer: {
        gap: 14,
    },

    footer: {
        marginTop: 24,
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: 13,
    },
});