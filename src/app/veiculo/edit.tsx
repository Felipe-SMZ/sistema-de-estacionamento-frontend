import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

import { veiculoStyles as styles } from '../../constants/veiculoStyles';
import { useProprietarios } from '../../hooks/useProprietarios';
import { useVeiculos } from '../../hooks/useVeiculos';

export default function VeiculoEdit() {
    const params = useLocalSearchParams<{
        id_veiculo?: string;
        placa?: string;
        ano?: string;
        mensalidade?: string;
        fk_proprietario?: string;
    }>();

    const [placa, setPlaca] = useState(params.placa ?? '');
    const [ano, setAno] = useState(params.ano ?? '');
    const [mensalidade, setMensalidade] = useState(
        params.mensalidade ?? ''
    );

    const [fkProprietario, setFkProprietario] = useState(
        Number(params.fk_proprietario ?? 0)
    );

    const [erro, setErro] = useState('');

    const { editarVeiculo } = useVeiculos();

    const {
        proprietarios,
        buscarProprietarios,
    } = useProprietarios();

    const router = useRouter();

    useEffect(() => {
        buscarProprietarios();
    }, [buscarProprietarios]);

    const handleSubmit = async () => {
        if (
            !placa.trim() ||
            !ano ||
            !mensalidade ||
            fkProprietario === 0
        ) {
            setErro('Preencha todos os campos.');
            return;
        }

        const id = Number(params.id_veiculo);
        const anoNumero = Number(ano);
        const mensalidadeNumero = Number(
            mensalidade.replace(',', '.')
        );

        const sucesso = await editarVeiculo(
            id,
            placa,
            anoNumero,
            mensalidadeNumero,
            fkProprietario
        );

        if (sucesso) {
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>
                    Editar Veículo
                </Text>

                <Text style={styles.label}>Placa</Text>

                <TextInput
                    style={styles.input}
                    value={placa}
                    onChangeText={setPlaca}
                    autoCapitalize="characters"
                />

                <Text style={styles.label}>Ano</Text>

                <TextInput
                    style={styles.input}
                    value={ano}
                    onChangeText={setAno}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Mensalidade</Text>

                <TextInput
                    style={styles.input}
                    value={mensalidade}
                    onChangeText={setMensalidade}
                    keyboardType="decimal-pad"
                />

                <Text style={styles.label}>Proprietário</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={fkProprietario}
                        onValueChange={(value) =>
                            setFkProprietario(Number(value))
                        }
                    >
                        <Picker.Item
                            label="Selecione um proprietário"
                            value={0}
                        />

                        {proprietarios.map((proprietario) => (
                            <Picker.Item
                                key={proprietario.id_proprietario}
                                label={proprietario.nome}
                                value={proprietario.id_proprietario}
                            />
                        ))}
                    </Picker>
                </View>

                {erro ? (
                    <Text style={styles.errorText}>
                        {erro}
                    </Text>
                ) : null}

                <View style={{ marginTop: 22 }}>
                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>
                            Alterar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}