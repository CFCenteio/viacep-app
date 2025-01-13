import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Button } from '@/components/ui/button';

type Usuario = {
  id: number;
  nome: string;
  cpf: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const mockedUsuarios: Usuario[] = [
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

const AddressList: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Usuario>({
    id: 0,
    nome: '',
    cpf: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/usuarios');
        // Verificar se a resposta é um array
        if (response.data) {
          return response.data;
        } else {
          return mockedUsuarios;
        }
      } catch (err) {
        console.error('Erro ao buscar usuários, usando dados mock:', err);
        return mockedUsuarios;
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/usuarios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    }
  });

  const editMutation = useMutation({
    mutationFn: async (user: Usuario) => {
      await api.put(`/api/usuarios/${user.id}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      setEditingUser(null);
      setFormData({
        id: 0,
        nome: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: ''
      });
    }
  });

  const handleEditClick = (user: Usuario) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMutation.mutate(formData);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados.</p>;

  return (
    <div>
      <h2>Endereços Salvos</h2>
      <ul>
        {Array.isArray(data) ? (
          data.map((usuario: Usuario) => (
            <li key={usuario.id} style={{ marginBottom: '1rem' }}>
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
              <p><strong>CEP:</strong> {usuario.cep}</p>
              <p>
                <strong>Endereço:</strong> {usuario.logradouro}, {usuario.bairro}, {usuario.cidade} - {usuario.estado}
              </p>
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate(usuario.id)}
              >
                Excluir
              </Button>
              <Button
                variant="default"
                onClick={() => handleEditClick(usuario)}
              >
                Editar
              </Button>
            </li>
          ))
        ) : (
          <p>Dados inesperados.</p>
        )}
      </ul>
      {editingUser && (
        <form onSubmit={handleSubmit}>
          <h2>Editando Usuário</h2>
          <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div>
            <label>CPF:</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
          </div>
          <div>
            <label>CEP:</label>
            <input type="text" name="cep" value={formData.cep} onChange={handleChange} required />
          </div>
          <div>
            <label>Logradouro:</label>
            <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
          </div>
          <div>
            <label>Bairro:</label>
            <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>
          <div>
            <label>Cidade:</label>
            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>
          <div>
            <label>Estado:</label>
            <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      )}
    </div>
  );
};

export default AddressList;
