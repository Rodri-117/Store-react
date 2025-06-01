import React from "react";
import styles from "./Brief.module.css";

const Brief = ({ carrito }) => {
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + producto.price * (producto.cantidad || 1), 0);
    };

    return (
        <div className={styles.brief}>
            <h3>Resumen de compra</h3>
            {carrito.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul>
                        {carrito.map((p) => (
                            <li key={p.id}>
                                {p.title} x {p.cantidad || 1} — ${ (p.price * (p.cantidad || 1)).toLocaleString() }
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total: </strong>${calcularTotal().toLocaleString()}</p>
                </>
            )}
        </div>
    );
};

export default Brief;
