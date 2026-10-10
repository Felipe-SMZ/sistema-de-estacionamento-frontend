import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Text,
    View
} from 'react-native';

import AppButton from '../../components/AppButton';
import FormInput from '../../components/FormInput';
import { proprietarioStyles as styles } from '../../constants/proprietarioStyles';
import { useProprietarios } from '../../hooks/useProprietarios';

export default function ProprietarioForm() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');

    const { cadastrarProprietario } = useProprietarios();

    const router = useRouter();

    const handleSubmit = async () => {
        const sucesso = await cadastrarProprietario(nome, cpf);

        if (sucesso) {
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Cadastrar Proprietário</Text>

                <FormInput
                    label="Nome"
                    placeholder="Digite o nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <FormInput
                    label="CPF"
                    placeholder="Digite o CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />

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