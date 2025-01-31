import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { api } from "../../services/api"

import { FiPlus, FiSearch } from "react-icons/fi";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { ButtonText } from "../../components/ButtonText";


export function Home() {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagsSelected(tagName) {
        if(tagName === "all") {
            setTagsSelected([]);
            return;
        }

        const alreadySelected = tagsSelected.includes(tagName);

            if(alreadySelected) {
                const filteredTags = tagsSelected.filter(tag => tag !== tagName);
                setTagsSelected(filteredTags);
            } else {
                setTagsSelected(prevState => [...prevState, tagName]);
            }

    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }
        fetchTags();
    }, []);

    useEffect( () => {
        async function fetchNotes() {
            try {
                const tagsQuery = tagsSelected.join(",");
                const response = await api.get("/notes", {
                    params: {
                        title: search,
                        tags: tagsQuery,
                    }
                });
    
                // Verifique se a resposta é um array
                if (Array.isArray(response.data.notesWithTags)) {
                    setNotes(response.data.notesWithTags);
                } else {
                    console.error("Resposta inesperada:", response.data);
                    setNotes([]);  // Garantir que notes seja um array vazio se a resposta não for válida
                }
            } catch (error) {
                console.error("Erro ao buscar notas:", error);
                setNotes([]);  // Garantir que notes seja um array vazio se ocorrer um erro
            }
        }
        fetchNotes();
    }, [tagsSelected, search])

    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos"
                        onClick={() => handleTagsSelected("all")}
                        isActive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                            title={tag.name}
                            onClick={() => handleTagsSelected(tag.name)}
                            isActive={tagsSelected.includes(tag.name)}

                            />
                        </li>
                    ))
                }
                
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
            </Search>

            <Content>
                <Section title="Minhas Notas">
                    {
                        notes.map(note => (
                            <Note   
                                key={String(note.id)}
                                data={note} 
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
}