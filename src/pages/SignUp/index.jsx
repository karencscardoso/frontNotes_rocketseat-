import { useState } from "react"
import { api } from "../../services/api"

import { Container, Form, Background } from "./styles";
import { Link, useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiUser} from "react-icons/fi"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp() {
        if(!name || !email || !password) {
            return alert("Preencha todos os campos");
        }

        api.post("/users", { name, email, password })
        .then(response => {
            alert(response.data.message)
            navigate("/")
        })
        .catch(error => {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível cadastrar.")
            }
        });
    }

    return (
        <Container>
            <Background />

            <Form>
                <h1>Rocketnotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>

                <h2>Crie sua conta</h2>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />
                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}

                />
                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}

                />

                <Button title="Cadastrar" onClick={ handleSignUp } />

                <Link to="/">
                    Voltar para o login
                </Link>

            </Form>


        </Container>
    )
}