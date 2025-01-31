import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { Container, Form } from "./styles";
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

export function New() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]); //Aqui armazena todos os links
    const [newLink, setNewLink] = useState(""); //Armazena o link add no momento

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("")
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleBack() {
        navigate(-1);
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag("")
    }

    function handleremoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote() {
        if(!title) {
            return alert("Digite o título da nota.")
        }

        if(newTag || newLink) {
            return alert("Adione a tag e/ou link ou deixe o campo vazio.")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota Criada com sucesso!")
        navigate(-1)
    }

    return (
        <Container>
           <Header />

           <main>
            <Form>
                <header>
                    <h1>Criar nota</h1>
                    <ButtonText
                        title="voltar"
                        onClick={handleBack} 
                    />
                </header>

                <Input 
                    placeholder="Título"
                    onChange={e => setTitle(e.target.value)}
                />
                <Textarea 
                    placeholder="Observações"
                    onChange={e => setDescription(e.target.value)}
                />
                <Section title="Links úteis">
                    {
                        links.map((link, index) => (
                            <NoteItem
                                key={String(index)}
                                value={link}
                                onClick={() => {handleRemoveLink(link)}} 
                            />
                        ))
                    }
                    <NoteItem 
                        isNew 
                        placeholder="Novo link"
                        value={newLink}
                        onChange={e => setNewLink(e.target.value)}
                        onClick={handleAddLink} 
                    />
                </Section>

                <Section title="Marcadores">
                    <div className="tags">
                        {
                            tags.map((tag, index) =>(
                                <NoteItem 
                                key={String(index)}
                                value={tag}
                                onClick={() => {handleremoveTag(tag)}}
                                />
                            ))
                            
                        }
                        
                        <NoteItem 
                            isNew 
                            placeholder="Nova tag"
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onClick={handleAddTag}
                        />
                    </div>
                </Section>
                <Button 
                    title="Salvar"
                    onClick={handleNewNote}
                />
            </Form>
           </main>
        </Container>
    )
}