import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Foods() {
    const { logout } = useContext(AuthContext);

    return (
        <>
            <h1>Alimentos</h1>
            <button onClick={logout}>Sair</button>
        </>
    );
}
