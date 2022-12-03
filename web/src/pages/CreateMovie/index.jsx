import { Container, Form, Tags, Main, ArrowBtn } from "./styles";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from 'react-icons/fi'

import { Header } from '../../components/Header'
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Marker } from "../../components/Marker";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { api } from "../../services/api";

export function CreateMovie() {
  const [ title, setTitle ] = useState("");
  const [ rating, steRating ] = useState("");
  const [ description, setDescription ] = useState("");


  const [ tags, setTags ] = useState([]);
  const [ newTag, setNewTag ] = useState("");

  const navigate = useNavigate();

  function handleNewTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleDeleteTag(tagDeleted){
    setTags(prevState => prevState.filter(tag => tag != tagDeleted ))
  }

  async function handleAddMovie(){
    if(!title){
      return alert('Digite um título.')
    }
    if(!rating){
      return alert('Digite uma nota.')
    }
    if(!description){
      return alert('Digite suas observações.')
    }

    if(newTag){
      return alert('Você digitou uma tag e não adicionou. Clique apra adicionar ou deixe o campo vazio.')
    }
    
    await api.post('/notes', {
      title,
      description,
      rating,
      tags
    });

    alert ('Nota criada com sucesso.')
    navigate(-1);
  }

  return (
    <Container>
      <Header/>

      <ArrowBtn to='/'>
        <ButtonText title="Voltar" icon={FiArrowLeft}/>
      </ArrowBtn>
          <Main>
            <Form>
              <h1>Novo filme</h1>
              <div className="inputs">
                <Input 
                  placeholder="Título" 
                  type="text"
                  onChange={e => setTitle(e.target.value)}
                />
                <Input 
                  placeholder="Sua nota (de 0 a 5)" 
                  type="number"
                  onChange={e => steRating(e.target.value)}
                />
              </div>
              <Textarea 
                placeholder="Observações" 
                type="text"
                onChange={e => setDescription(e.target.value)}
              />
            </Form>

            <h2>Marcadores</h2>

            <Tags>
              {
                tags.map((tag, index) => (
                  <Marker 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleDeleteTag(tag)}
                  />
                ))
              }
              <Marker 
                placeholder="Novo marcador" 
                isNew 
                onChange= {e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleNewTag}
              />
            </Tags>

            <div className="buttons">
              <Button title="Excluir filme" delMovie/>
              <Button 
                title="Salvar alterações"
                onClick={handleAddMovie}
              />
            </div>

          </Main>


    </Container>
  )
}