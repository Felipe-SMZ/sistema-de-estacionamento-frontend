import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

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

                <Text style={styles.label}>Nome</Text>

                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>CPF</Text>

                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />

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