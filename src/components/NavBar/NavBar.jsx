import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './Navbar.module.css';
import { FaShoppingCart } from "react-icons/fa";

const categorias = ['Todos', 'Mujer', 'Hombre'];

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const actualizarContador = () => {
            const cartItems = JSON.parse(localStorage.getItem("carrito")) || [];
            setCartCount(cartItems.length);
        };

        actualizarContador();

        window.addEventListener("storage", (e) => {
            if (e.key === "carrito") {
                actualizarContador();
            }
        });

        window.addEventListener("carritoActualizado", actualizarContador);

        return () => {
            window.removeEventListener("carritoActualizado", actualizarContador);
        };
    }, []);

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'category' && categorias.includes(pathParts[2])) {
            setCategoriaSeleccionada(pathParts[2]);
        } else {
            setCategoriaSeleccionada('Todos');
        }
    }, [location.pathname]);

    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada(categoria);
        if (categoria === 'Todos') {
            navigate('/category/todos');
        } else {
            navigate(`/category/${categoria}`);
        }
    };

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

                        <li className="nav-item dropdown">
                            <span className={`${styles["nav-link"]} nav-link dropdown-toggle`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }}>Productos</span>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categorias.map(categoria => (
                                    <li key={categoria}>
                                        <span className={`dropdown-item ${categoriaSeleccionada === categoria ? 'active' : ''}`} onClick={() => handleCategoriaClick(categoria)} style={{ cursor: 'pointer' }}>{categoria}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item"><Link className={`${styles["nav-link"]} nav-link`} to="/pedidos">Pedidos</Link></li>
                        <li className="nav-item"><Link className={`${styles["nav-link"]} nav-link`} to="/contacto">Contacto</Link></li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    <div className={styles["cart-icon-container"]}>
                        <Link to="/carrito" className={styles["cart-link"]}>
                            <FaShoppingCart size={24} color="#fff" />
                            <span className={styles.badge}>{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;











