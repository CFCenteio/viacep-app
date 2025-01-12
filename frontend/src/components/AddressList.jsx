import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

function AddressList() {
  const queryClient = useQueryClient();

  const mockedUsuarios = [
    {
      id: 1,
      nome: 'João Silva',
      cpf: '12345678901',
      cep: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      cpf: '10987654321',
      cep: '20040002',
      logradouro: 'Rua da Assembleia',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ'
    }
  ];

  const { data, error, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/usuarios');
        return response.data;
      } catch (err) {
        console.error('Erro ao buscar usuários, usando dados mock.', err);
        return mockedUsuarios;
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/usuarios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    }
  });

  if(isLoading) return <p>Carregando...</p>;
  if(error) return <p>Erro ao carregar dados.</p>;

  return (
    <div>
      <h2>Endereços Salvos</h2>
      <ul>
        {data.map(usuario => (
          <li key={usuario.id} style={{marginBottom: '1rem'}}>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>CPF:</strong> {usuario.cpf}</p>
            <p><strong>CEP:</strong> {usuario.cep}</p>
            <p><strong>Endereço:</strong> {usuario.logradouro}, {usuario.bairro}, {usuario.cidade} - {usuario.estado}</p>
            <button onClick={() => deleteMutation.mutate(usuario.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressList;
