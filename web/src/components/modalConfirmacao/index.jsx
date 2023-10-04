import React from 'react';
import styles from './styles.module.css';

const ConfirmationModal = ({ isOpen, message, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (

        <div className={styles.modal}>
            <div className={styles.adicionar}>
                <div className={styles.contmodal}>
                    <div className={styles.inputcontainer}>
                        <p>{message}</p>
                    </div>
                </div>
                <div className={styles.botao}>
                    <button onClick={onConfirm}>Sim</button>
                    <p style={{ cursor: "pointer" }} onClick={onClose}>Cancelar</p>
                </div>
            </div>
        </div >

    );
};

export default ConfirmationModal;


