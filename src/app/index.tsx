import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Sistema de Estacionamento</Text>

      <Link
        href="/proprietario"
        style={{
          marginTop: 20,
          fontSize: 18,
        }}
      >
        Proprietários
      </Link>

      <Link
        href="/veiculo"
        style={{
          marginTop: 20,
          fontSize: 18,
        }}
      >
        Veículos
      </Link>
    </View>
  );
}