import React, { useState } from "react";
import axios from "axios";
import api from "../api"; // Importa a instância configurada do Axios

const initialState = {
  nome: "",
  cpf: "",
  cep: "",
  logradouro: "",
  bairro: "",
  cidade: "",
  estado: "",
};

function AddressForm() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (CPFs inválidos)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    if (digito1 !== parseInt(cpf.charAt(9))) return false;

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    if (digito2 !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${formData.cep}/json/`
        );
        if (response.data.erro) {
          setError("CEP não encontrado.");
        } else {
          setFormData((prev) => ({
            ...prev,
            logradouro: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
          }));
          setError("");
        }
      } catch (err) {
        setError("Erro ao buscar o CEP.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
      // Utiliza a instância configurada do Axios para enviar dados ao backend
      await api.post("/api/usuarios", formData);
      setFormData(initialState);
      setError("");
      alert("Dados salvos com sucesso!");
    } catch (err) {
      setError("Erro ao salvar os dados.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>CEP:</label>
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          required
        />
      </div>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Logradouro:</label>
        <input
          type="text"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <label>Bairro:</label>
        <input
          type="text"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <label>Cidade:</label>
        <input
          type="text"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
        <label>Estado:</label>
        <input
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          readOnly
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Salvar</button>
    </form>
  );
}

export default AddressForm;
