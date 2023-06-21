import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';

import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroQuarto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/quartos`;

  const [id, setId] = useState('');
  const [numquarto, setNumquarto] = useState(0);
  const [qtdcamas, setQtdcamas] = useState(0);
  const [statusquarto, setStatusquarto] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNumquarto(0);
      setQtdcamas(0);
      setStatusquarto('');
    } else {
      setId(dados.id);
      setNumquarto(dados.numquarto);
      setQtdcamas(dados.qtdcamas);
      setStatusquarto(dados.statusquarto);
    }
  }

  async function salvar() {
    let data = {
      id,
      numquarto,
      qtdcamas,
      statusquarto,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Quarto ${numquarto} cadastrado com sucesso!`);
          navigate(`/listagem-quartos`);
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
          mensagemSucesso(`Quarto ${numquarto} alterado com sucesso!`);
          navigate(`/listagem-quartos`);
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
    setNumquarto(dados.numquarto);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Quarto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Numquarto: *' htmlFor='inputNumquarto'>
                <input
                  type='text'
                  id='inputNumQuarto'
                  value={numquarto}
                  className='form-control'
                  name='numquarto'
                  onChange={(e) => setNumquarto(e.target.value)}
                />
              </FormGroup>
              <br></br>
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

export default CadastroQuarto;
