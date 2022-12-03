import { useState } from "react";

import { Container, Main, Form, Background} from "./styles";

import { Link, useNavigate } from "react-router-dom";

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { api } from '../../services/api';

export function SignUp(){
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate();

  function handleSignUp(){
    //Verificar se todos campos foram preenchidos
    if (!name || !email || !password){
        return alert("Preencha todos os campos");
      }
      
    api.post('/users', { name, email, password })
    .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate(-1);
    })
    .catch(error => {
      //verifica se dentro do erro tem alguma resposta
      if(error.response){
        alert(error.response.data.message);
      }else{
        alert('Não foi possível cadastrar.')
      }
    })
  }

  function handleReturn(){
    navigate(-1)
  }

  return(
    <Container>
      <Main>
        <div className="header">
          <h1>RocketMovies</h1>
          <span>Aplicação para acompanhar tudo que assistir.</span>
          <h2>Cire sua conta</h2>
        </div>
        <Form>
          <Input 
            placeholder="Nome" 
            icon={FiUser}
            type = "text"
            onChange={e => setName(e.target.value)}
          />
          <Input 
            placeholder="E-mail" 
            icon={FiMail}
            type = "text"
            onChange={e => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Senha" 
            icon={FiLock}
            type = "password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button title='Cadastrar' onClick={handleSignUp}/>
        </Form>
        <ButtonText title='Voltar para o login' icon={FiArrowLeft} onClick={handleReturn}/>
        
      </Main>
      <Background/>
    </Container>
  )
}