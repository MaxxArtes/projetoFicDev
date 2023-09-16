import React from 'react';
import styles from './styles.module.css';
// import { Link } from 'react-router-dom';

export function PaginaInicial() {
    return (

        <div className={styles.paginainicial}>
            <img
                className={styles.element}
                alt="logo"
                src="logo.png"
            />
            <div className={styles.overlapgroup}>
                <button className={styles.rectangle}>atendimento</button><br />
                <button className={styles.rectangle1}>consulta</button><br />
                <button className={styles.rectangle}>adm</button><br />
            </div>
        </div>
    );
}
