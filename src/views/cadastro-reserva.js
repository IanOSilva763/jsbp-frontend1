import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroReserva() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/reservas`;

  const [id, setId] = useState('');
  const [datareserva, setDatareserva] = useState('');
  const [valordiaria, setValordiaria] = useState(0);
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [idHospede, setIdHospede] = useState(0);
  const [idQuarto, setIdQuarto] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDatareserva('');
      setValordiaria(0);
      setIdFuncionario(0);
      setIdHospede(0);
      setIdQuarto(0);
      // setIdCurso(0);
    } else {
      setId(dados.id);
      setDatareserva(dados.datareserva);
      setValordiaria(dados.valordiaria);
      setIdFuncionario(dados.idFuncionario);
      setIdHospede(dados.idHospede);
      setIdQuarto(dados.idQuarto);
      // setIdCurso(dados.idCurso);
    }
  }

  async function salvar() {
    let data = { id, datareserva, valordiaria, idFuncionario, idHospede, idQuarto, 
      // idCurso 
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Reserva do dia ${datareserva} cadastrada com sucesso!`);
          navigate(`/listagem-reservas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Reserva do dia ${datareserva} alterada com sucesso!`);
          navigate(`/listagem-reservas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setDatareserva(dados.datareserva);
    setValordiaria(dados.valordiaria);
    setIdFuncionario(dados.idFuncionario);
    setIdHospede(dados.idHospede);
    setIdQuarto(dados.idQuarto);
//    setIdCurso(dados.idCurso);
  }

  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);

  const [dadosHospedes, setDadosHospedes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/hospedes`).then((response) => {
      setDadosHospedes(response.data);
    });
  }, []);

  const [dadosQuartos, setDadosQuartos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/quartos`).then((response) => {
      setDadosQuartos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosHospedes) return null;
  if (!dadosQuartos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Reserva'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Datareserva: *' htmlFor='inputDatareserva'>
                <input
                  type='text'
                  id='inputDatareserva'
                  value={datareserva}
                  className='form-control'
                  name='datareserva'
                  onChange={(e) => setDatareserva(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valordiaria: *' htmlFor='inputValordiaria'>
                <input
                  type='text'
                  id='inputValordiaria'
                  value={valordiaria}
                  className='form-control'
                  name='valordiaria'
                  onChange={(e) => setValordiaria(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Funcionario: *' htmlFor='selectFuncionario'>
                <select
                  className='form-select'
                  id='selectFuncionario'
                  name='idFuncionario'
                  value={idFuncionario}
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.datareserva}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Hospede: *' htmlFor='selectHospede'>
                <select
                  className='form-select'
                  id='selectHospede'
                  name='idHospede'
                  value={idHospede}
                  onChange={(e) => setIdHospede(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosHospedes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Quarto: *' htmlFor='selectQuarto'>
                <select
                  className='form-select'
                  id='selectQuarto'
                  name='idQuarto'
                  value={idQuarto}
                  onChange={(e) => setIdQuarto(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosQuartos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.numquarto}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroReserva;
