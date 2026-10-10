import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

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

                <Text style={styles.label}>Nome</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>CPF</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />

                <View style={{ marginTop: 22 }}>
                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}