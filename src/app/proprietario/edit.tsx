import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Text,
    View
} from 'react-native';

import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import { proprietarioStyles as styles } from '../../constants/proprietarioStyles';
import { useProprietarios } from '../../hooks/useProprietarios';

export default function ProprietarioEdit() {
    const params = useLocalSearchParams<{
        id_proprietario?: string;
        nome?: string;
        cpf?: string;
    }>();

    const [nome, setNome] = useState(params.nome ?? '');
    const [cpf, setCpf] = useState(params.cpf ?? '');

    const { editarProprietario } = useProprietarios();

    const router = useRouter();

    const handleSubmit = async () => {
        const id = Number(params.id_proprietario);

        const sucesso = await editarProprietario(
            id,
            nome,
            cpf
        );

        if (sucesso) {
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>
                    Editar Proprietário
                </Text>

                <FormInput
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <FormInput
                    label="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />

                <View style={{ marginTop: 22 }}>
                    <AppButton
                        title="Alterar"
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </View>
    );
}