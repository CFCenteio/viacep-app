import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import api from '../api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormDataType = {
  nome: string;
  cpf: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const initialState: FormDataType = {
  nome: '',
  cpf: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: ''
};

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  if (digito2 !== parseInt(cpf.charAt(10))) return false;

  return true;
}

const AddressForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>(initialState);
  const [error, setError] = useState<string>('');

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        // Chama o endpoint do backend para consultar o CEP
        const response = await api.get(`/api/enderecos/${formData.cep}`);
        // Supondo que a resposta contenha os campos logradouro, bairro, localidade e uf
        if (!response.data) {
          setError('CEP não encontrado.');
        } else {
          setFormData(prev => ({
            ...prev,
            logradouro: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,   // ou 'cidade', dependendo da resposta do backend
            estado: response.data.uf            // ou 'estado'
          }));
          setError('');
        }
      } catch (err) {
        console.error('Erro ao buscar CEP no backend.', err);
        setError('Erro ao buscar o CEP.');
      }
    }
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nome || !formData.cpf || !formData.cep) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (!validarCPF(formData.cpf)) {
      setError("CPF inválido.");
      return;
    }

    try {
      await api.post("/api/usuarios", formData);
      setFormData(initialState);
      setError("");
      alert("Dados salvos com sucesso!");
    } catch (err) {
      setError("Erro ao salvar os dados:" + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="cep">CEP:</Label>
        <Input
          type="text"
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          required
        />
      </div>
      <div>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="cpf">CPF:</Label>
        <Input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="logradouro">Logradouro:</Label>
        <Input
          type="text"
          id="logradouro"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <Label htmlFor="bairro">Bairro:</Label>
        <Input
          type="text"
          id="bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <Label htmlFor="cidade">Cidade:</Label>
        <Input
          type="text"
          id="cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <Label htmlFor="estado">Estado:</Label>
        <Input
          type="text"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          readOnly
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit">Salvar</Button>
    </form>
  );
};

export default AddressForm;
