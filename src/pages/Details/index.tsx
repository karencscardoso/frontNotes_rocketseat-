import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { api } from "../../services/api.js"

import { Container, Links, Content } from './styles'

import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const params = useParams();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover essanota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fecthNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data)
    }
    fecthNote();
  }, [params.id]);

  return(
    <Container>
      <Header />
      {
        data &&
      <main>
        <Content>

          <ButtonText 
            title="Excluir nota"
            onClick={handleRemove}
          />

          <h1>{data.title}</h1>
          <p>{data.description}</p>

          {
            data.links &&
          <Section title="Links úteis">
            <Links>
            {
              data.links.map(link => (
              <li key={String(link.id)}>
                <a href={link.url} target="_blank">
                  {link.url}
                </a>
              </li>
              )) 
            }
            </Links>
          </Section>
          }
          {
            data.tags &&
          <Section title="Marcadores">
            {
              data.tags.map(tag => (
            <Tag
              key={String(tag.id)}
              title={tag.name}
            />
          ))
            }
          </Section>
          }
          
          <Button 
            title="Voltar"
            onClick={handleBack}
          />
        </Content>
      </main>
      }
    </Container>
  )
}