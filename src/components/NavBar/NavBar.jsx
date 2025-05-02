import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cartItems.length);
    }, []);

    return (
        <nav className={`${styles.navbar} navbar navbar-expand-lg`}>
            <div className="container-fluid">
                <Link className={styles["navbar-brand"]} to="/">
                    <img src="../images/alma-logo.png" alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className={`${styles["nav-link"]} nav-link active`} to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className={`${styles["nav-link"]} nav-link`} to="/category/todos">Productos</Link></li>
                        <li className="nav-item"><Link className={`${styles["nav-link"]} nav-link`} to="/pedidos">Pedidos</Link></li>
                        <li className="nav-item"><Link className={`${styles["nav-link"]} nav-link`} to="/contacto">Contacto</Link></li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    <li className="nav-item">
                        <Link to="/carrito">
                            <img src="../iconos/carrito-de-compras.png" alt="carrito" />
                            <span className={`position-absolute top-0 start-100 translate-middle ${styles.badge}`}>
                                {cartCount}
                            </span>
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;






