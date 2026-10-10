import axios from 'axios';
import { useCallback, useState } from 'react';
import { apiBaseUrl } from '../constants/api';

export type Proprietario = {
    id_proprietario: number;
    nome: string;
    cpf: string;
};

export function useProprietarios() {
    const [proprietarios, setProprietarios] =
        useState<Proprietario[]>([]);

    const buscarProprietarios = useCallback(async () => {
        try {
            const response = await axios.get<Proprietario[]>(
                `${apiBaseUrl}/proprietario`
            );

            setProprietarios(response.data);
        } catch (error) {
            console.log('Erro ao buscar proprietários:', error);
        }
    }, []);

    const cadastrarProprietario = async (nome: string, cpf: string) => {
        try {
            await axios.post(`${apiBaseUrl}/proprietario`, {
                nome,
                cpf,
            });

            return true;
        } catch (error) {
            console.log('Erro ao cadastrar proprietário:', error);
            return false;
        }
    };

    const excluirProprietario = async (id: number) => {
        try {
            await axios.delete(`${apiBaseUrl}/proprietario/${id}`);

            return true;
        } catch (error) {
            console.log('Erro ao excluir proprietário:', error);
            return false;
        }
    };

    const editarProprietario = async (
        id: number,
        nome: string,
        cpf: string
    ) => {
        try {
            await axios.put(`${apiBaseUrl}/proprietario/${id}`, {
                nome,
                cpf,
            });

            return true;
        } catch (error) {
            console.log('Erro ao editar proprietário:', error);
            return false;
        }
    };

    return {
        proprietarios,
        buscarProprietarios,
        cadastrarProprietario,
        excluirProprietario,
        editarProprietario,
    };  
}