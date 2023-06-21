import React from 'react';

import ListagemUsuarios from './views/listagem-usuarios';
import ListagemQuartos from './views/listagem-quartos';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemHospedes from './views/listagem-hospedes';
import ListagemReservas from './views/listagem-reservas';

import Login from './views/login';
import CadastroUsuario from './views/cadastro-usuario';
import CadastroQuarto from './views/cadastro-quarto';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroHospede from './views/cadastro-hospede';
import CadastroReserva from './views/cadastro-reserva';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro-usuarios/:idParam?' element={<CadastroUsuario />} />
        <Route path='/cadastro-quartos/:idParam?' element={<CadastroQuarto />} />
        <Route path='/cadastro-funcionarios/:idParam?' element={<CadastroFuncionario />} />
        <Route path='/cadastro-hospedes/:idParam?' element={<CadastroHospede />} />
        <Route path='/cadastro-reservas/:idParam?' element={<CadastroReserva />} />
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/listagem-quartos' element={<ListagemQuartos />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/listagem-hospedes' element={<ListagemHospedes />} />
        <Route path='/listagem-reservas' element={<ListagemReservas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
