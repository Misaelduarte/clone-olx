import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';

const Page = () => {
  const api = useApi();

  const [ name, setName ] = useState('');
  const [ states, setStates ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ stateList, setStateList ] = useState([]);
  const [ disabled, setDisabled ] = useState(false);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const getState = async () => {
      const slist = await api.getState();
      setStateList(slist);
    }
    getState();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    if(password !== confirmPassword) {
      setError('Senhas não batem!');
      setDisabled(false);
      return;
    }

    const json = await api.register(name, email, password, states);

    if(json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = '/';
    }

    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        { error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>
        <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                required
                type="text"
                disabled={disabled}
                value={name}
                onChange={e=>setName( e.target.value )}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select value={states} onChange={e=>setStates( e.target.value )} required disabled={disabled} >
                <option></option>
                {stateList.map((item, index) => {
                  return(
                    <option key={index} value={item._id}>{item.name}</option>
                  );
                })}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                required
                type="email"
                disabled={disabled}
                value={email}
                onChange={e=>setEmail( e.target.value )}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                required
                type="password"
                disabled={disabled}
                value={password}
                onChange={e=>setPassword( e.target.value )}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                required
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={e=>setConfirmPassword( e.target.value )}
              />
            </div>
          </label>

          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Cadastrar</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;
