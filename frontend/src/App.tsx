// import React from 'react';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import './App.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Consulta de CEP e Gerenciamento de Endereços</h1>
      <AddressForm />
      <hr className="my-2" />
      <AddressList />
    </div>
  );
}

export default App;
