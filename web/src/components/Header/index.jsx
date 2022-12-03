import { Container, User, Avatar } from './styles';
import { Input } from '../Input'
import { useAuth } from './../../hooks/auth'

import { Link, useNavigate } from 'react-router-dom';
import { ButtonText } from '../ButtonText';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { api } from '../../services/api';

export function Header({onChange}){ 
  const { signOut, user } = useAuth();
  
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  const navigation = useNavigate();

  function handleSignOut(){
    signOut();
    navigation('/');
  }

  return (
    <Container>
      <Link to='/'>
        RocketMovies
      </Link>
      <Input placeholder='Pesquisar pelo título' onChange={onChange}></Input>

      <User>
        <div>
            <strong>{user.name}</strong>
            <ButtonText title='sair' onClick={handleSignOut}/>
        </div>
        <Avatar to='/profile'>
          <img src={avatarUrl} alt={user.name} />
        </Avatar>
      </User>

    </Container>
  )
}