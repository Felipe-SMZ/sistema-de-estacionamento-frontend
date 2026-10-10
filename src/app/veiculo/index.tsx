import {
    useFocusEffect,
    useRouter,
} from 'expo-router';
import { useCallback } from 'react';
import {
    FlatList,
    Text,
    View
} from 'react-native';

import AppButton from '../../components/AppButton';
import { veiculoStyles as styles } from '../../constants/veiculoStyles';
import { useProprietarios } from '../../hooks/useProprietarios';
import { useVeiculos } from '../../hooks/useVeiculos';

export default function VeiculoList() {
    const { veiculos, buscarVeiculos, excluirVeiculo } = useVeiculos();

    const router = useRouter();

    const {
        proprietarios,
        buscarProprietarios,
    } = useProprietarios();

    useFocusEffect(
        useCallback(() => {
            buscarVeiculos();
            buscarProprietarios();
        }, [buscarVeiculos,
            buscarProprietarios])
    );

    const buscarNomeProprietario = (id: number) => {
        const proprietario = proprietarios.find(
            (item) => item.id_proprietario === id
        );

        return proprietario?.nome ?? 'Proprietário não encontrado';
    };

    const handleDelete = async (id: number) => {
        const sucesso = await excluirVeiculo(id);

        if (sucesso) {
            buscarVeiculos();
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Lista de Veículos</Text>
            </View>

            <FlatList
                data={veiculos}
                keyExtractor={(item) => String(item.id_veiculo)}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.placa}>{item.placa}</Text>

                        <Text style={styles.info}>
                            Ano: {item.ano}
                        </Text>

                        <Text style={styles.info}>
                            Mensalidade: R$ {item.mensalidade}
                        </Text>

                        <Text style={styles.info}>
                            Proprietário: {buscarNomeProprietario(item.fk_proprietario)}
                        </Text>

                        <View style={styles.row}>
                            <AppButton
                                title="Editar"
                                variant="edit"
                                style={{ flex: 1 }}
                                onPress={() =>
                                    router.push({
                                        pathname: '/veiculo/edit',
                                        params: {
                                            id_veiculo: String(item.id_veiculo),
                                            placa: item.placa,
                                            ano: String(item.ano),
                                            mensalidade: String(item.mensalidade),
                                            fk_proprietario: String(item.fk_proprietario),
                                        },
                                    })
                                }
                            />

                            <AppButton
                                title="Excluir"
                                variant="danger"
                                style={{ flex: 1 }}
                                onPress={() => handleDelete(item.id_veiculo)}
                            />
                        </View>

                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Nenhum veículo cadastrado.
                    </Text>
                }
            />
            <View style={styles.section}>
                <View style={styles.section}>
                    <AppButton
                        title="Novo Veículo"
                        onPress={() => router.push('/veiculo/form')}
                    />
                </View>
            </View>
        </View>
    );
}