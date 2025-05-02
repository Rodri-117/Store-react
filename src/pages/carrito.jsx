import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import styles from "./CartPage.module.css";

const CartPage = () => {
    return (
        <div className={styles["cart-page"]}>
            <main className={styles["main-cart"]}>
                <h1>Tu carrito</h1>
                {/* Aquí iría la lógica para listar los productos agregados */}
                <p>No hay productos en el carrito.</p>
                <Link to="/" className="btn btn-primary">
                    Volver al inicio
                </Link>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
