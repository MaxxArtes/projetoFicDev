import styles from './styles.module.css';

export function Input(props) {
    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type={props.type}
                placeholder={props.placeholder}
                {...props.validations}
            />
            {props.error &&
                <span className={styles.message}>
                    {props.error.message}
                </span>
            }
        </div>
    );
}
