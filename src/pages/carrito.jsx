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

    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        window.dispatchEvent(new Event("carritoActualizado"));
    };

    const handleEliminarDelCarrito = (id) => {
        const nuevosProductos = carrito.filter(producto => producto.id !== id);
        actualizarCarrito(nuevosProductos);
    };

    const modificarCantidad = (id, operacion) => {
        const nuevoCarrito = carrito.map(producto => {
            if (producto.id === id) {
                const nuevaCantidad = operacion === "sumar"
                    ? Math.min(producto.cantidad + 1, producto.stock)
                    : producto.cantidad - 1;

                return nuevaCantidad > 0
                    ? { ...producto, cantidad: nuevaCantidad }
                    : null;
            }
            return producto;
        }).filter(Boolean);

        actualizarCarrito(nuevoCarrito);
    };

    const calcularTotal = () => {
        return carrito.reduce((total, producto) => {
            const subtotal = producto.price * (producto.cantidad || 1);
            return total + subtotal;
        }, 0);
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
                                        <img src={`/images/${producto.imageId}`} alt={producto.title || "Producto"} className={styles["cart-item-img"]}/>
                                        <div className={styles["cart-item-info"]}>
                                            <h5>{producto.title}</h5>
                                            <p className={styles["precio"]}>${producto?.price?.toLocaleString?.() ?? "0"} x {producto?.cantidad ?? 1}</p>
                                            <div className={styles["quantity-controls"]}>
                                                <button onClick={() => modificarCantidad(producto.id, "restar")} className={styles["btn-cantidad"]}>-</button>
                                                <span>{producto.cantidad}</span>
                                                <button onClick={() => modificarCantidad(producto.id, "sumar")} className={styles["btn-cantidad"]} disabled={producto.cantidad >= producto.stock}>
                                                    +
                                                </button>
                                            </div>
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
                                    <p className={styles["total-amount"]}>
                                        ${calcularTotal().toLocaleString()}
                                    </p>
                                </div>

                                {}
                                <Link to="/checkout" className="btn btn-success mt-3">
                                    Finalizar compra
                                </Link>
                            </div>
                        )}

                        <Link to="/" className="btn btn-primary mt-3 ms-2">
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




