import { Container, Main, Title, NewMovie } from './styles'

import { FiPlus } from 'react-icons/fi'

import { Header } from '../../components/Header'
import { Review } from '../../components/Review'
import { useState } from 'react'
import { api } from '../../services/api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home(){
  const [ search, setSearch ] = useState('');
  const [ notes, setNotes ] = useState('');
  
  const navigate = useNavigate();
  function handleOpenMovieReview(id){
    navigate(`/moviepreview/${id}`)
  }

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}`);
      setNotes(response.data);
    }

    fetchNotes();
  }, [search]);

  return (
    <Container>
      <Header
        onChange={e=> setSearch(e.target.value)}
      />
      <Title>
        <h1>Meus filmes</h1>
        <NewMovie to='/createmovie'>  
          <button> 
            <FiPlus/> 
            <span> Adicionar filme</span>
          </button>
        </NewMovie>
      </Title>
      <Main>
        {
          Array.from(notes).map((note) => (
            <Review 
              data={note} 
              key={note.id}
              onClick={() => handleOpenMovieReview(note.id)}
            />))
        }
      </Main>
    </Container>
  )
}