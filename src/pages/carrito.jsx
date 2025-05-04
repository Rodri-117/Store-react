import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import styles from "./CartPage.module.css";

const CartPage = () => {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(productosEnCarrito);
    }, []);

    const handleEliminarDelCarrito = (id) => {
        const nuevosProductos = carrito.filter(producto => producto.id !== id);
        localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
        setCarrito(nuevosProductos);

        window.dispatchEvent(new Event("carritoActualizado"));
    };

    // Calcular el total de la compra
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + producto.precio, 0);
    };

    return (
        <div className={styles["cart-page"]}>
            <div className={styles["main-wrapper"]}>
                <main className={styles["main-cart"]}>
                    <div className={styles["cart-card"]}>
                        <h1>Tu carrito</h1>
                        {carrito.length === 0 ? (
                            <p>No hay productos en el carrito.</p>
                        ) : (
                            <div>
                                {carrito.map((producto) => (
                                    <div key={producto.id} className={styles["cart-item"]}>
                                        <div className={styles["cart-item-info"]}>
                                            <h5>{producto.nombre}</h5>
                                            <p className={styles["precio"]}>${producto.precio.toLocaleString()}</p>
                                            <button 
                                                onClick={() => handleEliminarDelCarrito(producto.id)} 
                                                className={styles["btn-eliminar"]}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className={styles["summary"]}>
                                    <p>Total:</p>
                                    <p className={styles["total-amount"]}>${calcularTotal().toLocaleString()}</p>
                                </div>
                            </div>
                        )}
                        <Link to="/" className="btn btn-primary">
                            Volver al inicio
                        </Link>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;

