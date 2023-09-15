import React from "react";
import { Link } from "react-router-dom";

export const PaginaInicial = () => {
    return (
        <div className="pagina-inicial">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <img className="element" alt="Element" src="72857228-f064-4397-aa4d-8b80b0cd08bd-1.png" />
                        <div className="frame">
                            <div className="div" />
                        </div>
                        <div className="rectangle-2" />
                        <div className="rectangle-3" />
                        <div className="text-wrapper">TELA DE SERVIÇOS</div>
                        <div className="text-wrapper-2">ATENDIMENTO</div>
                        <div className="text-wrapper-3">CONSULTA</div>
                        <div className="text-wrapper-4">ADMIN</div>
                    </div>
                    <div className="overlap-2">
                        <div className="rectangle-4" />
                        <img className="vector" alt="Vector" src="vector.svg" />
                    </div>
                    <div className="overlap-group-2">
                        <Link className="rectangle-4" to="/pagina-inicial" />
                        <img className="account-circle" alt="Account circle" src="account-circle.svg" />
                    </div>
                </div>
            </div>
        </div>
    );
};
