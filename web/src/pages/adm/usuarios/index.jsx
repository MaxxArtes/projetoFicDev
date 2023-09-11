// npm install react-bootstrap bootstrap react-hook-form
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { Input } from './components/Input';

// React Bootstrap + React Hook Form
export default function App() {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const token = await result.json();
            console.log(token);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form
            noValidate
            validated={!!errors}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Row>
                <Col>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Insira seu Nome"
                        error={errors.name}
                        required={true}
                        name="name"
                        validations={register('name', {
                            required: {
                                value: true,
                                message: 'Nome é obrigatório'
                            },
                        })}
                    />
                </Col>
                <Col>
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        error={errors.password}
                        required={true}
                        name="password"
                        validations={register('password', {
                            required: {
                                value: true,
                                message: 'Senha é obrigatório'
                            }
                        })}
                    />
                </Col>
            </Row>
            <Button type="submit">Enviar</Button>
        </Form>
    );
}
