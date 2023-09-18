import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';



export function PaginaInicial() {
    return (

        <div className={styles.paginainicial}>
            <img
                className={styles.element}
                alt="logo"
                src="logo.png"
            />
            <div className={styles.overlapgroup}>
                <Link to="/agendamento/">
                    <button className={styles.rectangle}>atendimento</button><br />
                </Link>
                <button className={styles.rectangle1}>consulta</button><br />
                <Link to="/Usuarios/">
                    <button className={styles.rectangle}>adm</button>
                </Link>
            </div>
        </div>
    );
}
