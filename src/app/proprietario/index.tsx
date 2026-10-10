import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import AppButton from '../../components/AppButton';
import { proprietarioStyles as styles } from '../../constants/proprietarioStyles';
import { useProprietarios } from '../../hooks/useProprietarios';

export default function ProprietarioList() {

    const {
        proprietarios,
        buscarProprietarios,
        excluirProprietario,
    } = useProprietarios();

    const router = useRouter();

    const handleDelete = async (id: number) => {
        const sucesso = await excluirProprietario(id);

        if (sucesso) {
            buscarProprietarios();
        }
    };

    useFocusEffect(
        useCallback(() => {
            buscarProprietarios();
        }, [buscarProprietarios])
    );

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Lista de Proprietários</Text>
            </View>

            <FlatList
                data={proprietarios}
                keyExtractor={(item) => String(item.id_proprietario)}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.cpf}>{item.cpf}</Text>

                        <View style={styles.row}>
                            <AppButton
                                title="Editar"
                                variant="edit"
                                style={{ flex: 1 }}
                                onPress={() =>
                                    router.push({
                                        pathname: '/proprietario/edit',
                                        params: {
                                            id_proprietario: String(item.id_proprietario),
                                            nome: item.nome,
                                            cpf: item.cpf,
                                        },
                                    })
                                }
                            />

                            <AppButton
                                title="Excluir"
                                variant="danger"
                                style={{ flex: 1 }}
                                onPress={() => handleDelete(item.id_proprietario)}
                            />
                        </View>
                    </View>
                )}
            />

            <View style={styles.section}>
                <View style={styles.section}>
                    <AppButton
                        title="Novo Proprietário"
                        onPress={() => router.push('/proprietario/form')}
                    />
                </View>
            </View>
        </View>
    );
}