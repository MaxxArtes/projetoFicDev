import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Input } from '../../components/Input';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './styles.module.css';

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, loading } = useContext(AuthContext);

    return (
        <div>
            <h1>Seja Bem-vindo!</h1>
            <form className={styles.form} onSubmit={handleSubmit(login)} noValidate>
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
                    <button disabled={loading} type="submit">Entrar</button>
                    <Link to="/register">Crie sua conta</Link>
                </div>
                {loading && <p style={{ color: '#000' }}>Carregando...</p>}
            </form>
        </div>
    );
}
