import { Container, Main, Form, Background} from "./styles";

import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/auth';

import { FiMail, FiLock } from 'react-icons/fi'

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useState } from "react";

export function SignIn(){
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const { signIn } = useAuth();

  function handleSignIn(){
    signIn({ email, password });
  }


  return(
    <Container>
      <Main>
        <div className="header">
          <h1>RocketMovies</h1>
          <span>Aplicação para acompanhar tudo que assistir.</span>
          <h2>Faça seu login</h2>
        </div>
        <Form>
          <Input 
            placeholder="E-mail" 
            type='text'
            icon={FiMail} 
            onChange={e => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Senha" 
            icon={FiLock} 
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
          <Button title='Entrar' onClick={handleSignIn}/>
        </Form>
        <Link to='/SignUp'>
          <ButtonText title='Criar conta'/>
        </Link>
        
      </Main>
      <Background/>
    </Container>
  )
}