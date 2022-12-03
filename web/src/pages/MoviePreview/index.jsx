import { Container, Body, Main } from './styles'
import theme from '../../styles/theme'

import { FiArrowLeft, FiStar, FiClock } from 'react-icons/fi'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { TagPreview } from '../../components/TagPreview'
import { Tag } from '../../components/Tag'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'


export function MoviePreview() {
  const [ data, setData ] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  
  const { user } = useAuth();
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  async function handleRemove() {
    const confirm = window.confirm('Você tem certeza que deseja deletar a nota?');

    if (confirm){
      await api.delete(`/notes/${params.id}`);
      navigate(-1)
    }
  }

  function handleReturn(){
    navigate(-1)
  }

  useEffect(()=>{
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data);
    }
    fetchNote();
  },[])

  return (
    <Container>
      <Header/>
      <Body>
        <div className='topButtons'>
          <ButtonText title='Voltar' icon={FiArrowLeft} onClick={handleReturn}/>
          <ButtonText title='Excluir nota' onClick={handleRemove}/>
        </div>
        

        {data &&
                <Main>
                <div className='movieId'>
                  <h1>{data.title}</h1>
                  <div className="rating">
                    { (data.rating == 5 ) ? (
                      <div>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      </div>)
                    : (<div></div>)}
                    { (data.rating == 4 ) ? (
                      <div>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar />
                      </div>)
                    : (<div></div>)}
                    { (data.rating == 3 ) ? (
                      <div>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar />
                      <FiStar />
                      </div>)
                    : (<div></div>)}
                    { (data.rating == 2 ) ? (
                      <div>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      </div>)
                    : (<div></div>)}
                    { (data.rating == 1 ) ? (
                      <div>
                      <FiStar fill={theme.COLORS.RED}/>
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      </div>)
                    : (<div></div>)}
                    { (data.rating == 0 ) ? (
                      <div>
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      </div>)
                    : (<div></div>)}

                  </div>
                </div>
                <div className='id'>
                  <img src={avatarUrl} alt='user avatar'/>
                  <span>Por {user.name}</span>
                  <FiClock/>
                  <span>{data.created_at.split(' ')[0].split('-').reverse().join('/')}{`\xa0`}
                     às {data.created_at.split(' ')[1].substring(0,5)}</span>
                </div>
                <div className='tags'>
                  {data.tags &&
                    data.tags.map(tag => (
                      <Tag 
                        title={tag.name} 
                        key={tag.id}
                      />
                    ))
                  }
                </div>
                <p>
                  {data.description}
                </p>
              </Main>
        }

      </Body>
    </Container>
  )
}