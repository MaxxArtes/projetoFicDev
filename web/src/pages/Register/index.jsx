import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import styles from './styles.module.css'
import { Link } from 'react-router-dom';

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, loading } = useContext(AuthContext);

    return (
        <div>
            <h1>Crie sua conta!</h1>
            <form className={styles.form} onSubmit={handleSubmit(createUser)} noValidate>
                <Input
                    type="email"
                    placeholder="Insira seu e-mail"
                    validations={register('email', {
                        required: 'E-mail obrigatório',
                        pattern: {
                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                            message: 'E-mail inválido'
                        }
                    })}
                    error={errors.email}
                />
                <Input
                    type="password"
                    placeholder="Insira sua senha"
                    validations={register('password', {
                        required: 'Senha é obrigatória',
                        minLength: {
                            value: 3,
                            message: 'A senha precisa ser maior que 3 caracteres.'
                        },
                    })}
                    error={errors.password}
                />
                <div className={styles.buttons}>
                    <button disabled={loading} type="submit">Criar</button>
                    <Link to="/">Eu já tenho conta</Link>
                </div>
                {loading && <p style={{ color: '#000' }}>Carregando...</p>}
            </form>
        </div>
    );
}
