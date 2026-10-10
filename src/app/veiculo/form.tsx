import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Text,
    View
} from 'react-native';

import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import { veiculoStyles as styles } from '../../constants/veiculoStyles';
import { useProprietarios } from '../../hooks/useProprietarios';
import { useVeiculos } from '../../hooks/useVeiculos';

export default function VeiculoForm() {
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');
    const [mensalidade, setMensalidade] = useState('');
    const [fkProprietario, setFkProprietario] = useState(0);
    const [erro, setErro] = useState('');

    const { cadastrarVeiculo } = useVeiculos();

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

        const anoNumero = Number(ano);
        const mensalidadeNumero = Number(
            mensalidade.replace(',', '.')
        );

        const sucesso = await cadastrarVeiculo(
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
                    Cadastrar Veículo
                </Text>

                <FormInput
                    label="Placa"
                    placeholder="Digite a placa"
                    value={placa}
                    onChangeText={setPlaca}
                    autoCapitalize="characters"
                />

                <FormInput
                    label="Ano"
                    placeholder="Digite o ano"
                    value={ano}
                    onChangeText={setAno}
                    keyboardType="numeric"
                />

                <FormInput
                    label="Mensalidade"
                    placeholder="Digite a mensalidade"
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
                    <AppButton
                        title="Salvar"
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </View>
    );
}