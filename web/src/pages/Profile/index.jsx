import { Container ,Header, Main, Form, Avatar } from './styles'

import { useNavigate} from 'react-router-dom';

import { FiUser, FiMail, FiLock, FiArrowLeft, FiCamera } from 'react-icons/fi'

import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useState } from 'react';

import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

export function Profile(){
  const { user, updateProfile } = useAuth();

  const [ name, setName ] = useState(user.name);
  const [ email, setEmail ] = useState(user.email);
  const [ passwordOld, setPasswordOld ] = useState();
  const [ passwordNew, setPasswordNew ] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  const [ avatar, setAvatar ] = useState(avatarUrl);
  const [ avatarFile, setAvatarFile ] = useState(null);

  const navigate = useNavigate();

  async function handleUpdateProfile(){
    const updatedItems = {
      name, 
      email,
      password: passwordNew,
      password_old: passwordOld
    }

    const userUpdated = Object.assign(user, updatedItems);
    
    updateProfile({ user: userUpdated, avatarFile });
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview)
  }

  function handleReturn(){
    navigate(-1)
  }

  return (
    <Container>
      <Header>
        
        <ButtonText title='Voltar' icon={FiArrowLeft} onClick={handleReturn}/>
        
      </Header>
      <Main>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor='avatar'>
            <FiCamera/>
            <input type="file" id='avatar' onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Form>
          <div className='user'>
            <Input 
              placeholder='Nome' 
              icon={FiUser}
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input 
              placeholder='E-mail' 
              icon={FiMail}
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='password'>
            <Input 
              placeholder='Senha atual' 
              icon={FiLock}
              type='password'
              onChange={e => setPasswordOld(e.target.value)}
            />
            <Input 
              placeholder='Nova senha' 
              icon={FiLock}
              type='password'
              onChange={e => setPasswordNew(e.target.value)}
            />
          </div>
        </Form>
        
        <Button title='Salvar' onClick={handleUpdateProfile}/>
      </Main>

    </Container>
  )
}