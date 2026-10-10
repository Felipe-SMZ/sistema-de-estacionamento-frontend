import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

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
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonEdit,
                                    { flex: 1 },
                                ]}
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
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </Pressable>
                            
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonDanger,
                                    { flex: 1 },
                                ]}
                                onPress={() => handleDelete(item.id_proprietario)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />

            <View style={styles.section}>
                <Pressable
                    style={styles.button}
                    onPress={() => router.push('/proprietario/form')}
                >
                    <Text style={styles.buttonText}>
                        Novo Proprietário
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}