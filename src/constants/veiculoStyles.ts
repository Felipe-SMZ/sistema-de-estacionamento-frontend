import { StyleSheet } from 'react-native';

export const veiculoStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7fafc',
    },

    section: {
        padding: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827',
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        elevation: 2,
    },

    placa: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    info: {
        marginTop: 4,
        color: '#4b5563',
    },

    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        marginTop: 20,
    },
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

    pickerContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        overflow: 'hidden',
    },

    button: {
        backgroundColor: '#1d75cd',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
    },

    errorText: {
        color: '#dc2626',
        marginTop: 12,
    },
    buttonDanger: {
        backgroundColor: '#dc2626',
    },

    buttonEdit: {
        backgroundColor: '#f97316',
    },

    row: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
    },
});