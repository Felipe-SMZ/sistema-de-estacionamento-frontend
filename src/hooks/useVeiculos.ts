import axios from 'axios';
import { useCallback, useState } from 'react';

import { apiBaseUrl } from '../constants/api';

export type Veiculo = {
    id_veiculo: number;
    placa: string;
    ano: number;
    mensalidade: number;
    fk_proprietario: number;
};

export function useVeiculos() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    const buscarVeiculos = useCallback(async () => {
        try {
            const response = await axios.get<Veiculo[]>(
                `${apiBaseUrl}/veiculo`
            );

            setVeiculos(response.data);
        } catch (error) {
            console.log('Erro ao buscar veículos:', error);
        }
    }, []);

    const cadastrarVeiculo = async (
        placa: string,
        ano: number,
        mensalidade: number,
        fk_proprietario: number
    ) => {
        try {
            await axios.post(`${apiBaseUrl}/veiculo`, {
                placa,
                ano,
                mensalidade,
                fk_proprietario,
            });

            return true;
        } catch (error) {
            console.log('Erro ao cadastrar veículo:', error);
            return false;
        }
    };
    const excluirVeiculo = async (id: number) => {
        try {
            await axios.delete(`${apiBaseUrl}/veiculo/${id}`);

            return true;
        } catch (error) {
            console.log('Erro ao excluir veículo:', error);
            return false;
        }
    };

    const editarVeiculo = async (
        id: number,
        placa: string,
        ano: number,
        mensalidade: number,
        fk_proprietario: number
    ) => {
        try {
            await axios.put(`${apiBaseUrl}/veiculo/${id}`, {
                placa,
                ano,
                mensalidade,
                fk_proprietario,
            });

            return true;
        } catch (error) {
            console.log('Erro ao editar veículo:', error);
            return false;
        }
    };

    return {
        veiculos,
        buscarVeiculos,
        cadastrarVeiculo,
        excluirVeiculo,
        editarVeiculo,
    };
}