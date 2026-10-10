import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import { homeStyles as styles } from '../constants/homeStyles';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Sistema de Estacionamento
        </Text>

        <Text style={styles.subtitle}>
          Gerencie proprietários e veículos cadastrados no estacionamento.
        </Text>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Proprietários"
            onPress={() => router.push('/proprietario')}
          />

          <AppButton
            title="Veículos"
            onPress={() => router.push('/veiculo')}
          />
        </View>

        <Text style={styles.footer}>
          Programação para Dispositivos Móveis II
        </Text>
      </View>
    </View>
  );
}