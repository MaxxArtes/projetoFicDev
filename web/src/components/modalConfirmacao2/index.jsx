import React, { useState } from 'react';
import styles from './styles.module.css';

const ConfirmationModal2 = ({ isOpenn, message, onClose, onConfir }) => {
    if (!isOpenn) return null;

    return (

        <div className={styles.modal}>
            <div className={styles.adicionar}>
                <div className={styles.contmodal}>
                    <div className={styles.inputcontainer}>
                        <p>{message}</p>
                    </div>
                </div>
                <div className={styles.botao}>
                    <button onClick={onConfir}>Sim</button>
                    <p onClick={onClose}>Cancelar</p>
                </div>
            </div>
        </div >

    );
};

export default ConfirmationModal2;


