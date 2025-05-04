import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import styles from './productos.module.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/productos.json')
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error al cargar los productos:', err));
    }, []);

    const handleAgregarAlCarrito = (producto) => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        window.dispatchEvent(new Event("carritoActualizado"));

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className={styles.itemContainer}>
            <h1 className={styles.titulo}>Productos</h1>
            <div className={styles.grid}>
                {productos.map((producto) => (
                    <div key={producto.id} className={styles.card}>
                        <Link to={`/item/${producto.id}`} className={styles.linkCard}>
                            <img src={producto.imagen} className={styles.cardImg} alt={producto.nombre} />
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>{producto.nombre}</h5>
                                <p className={styles.cardPrice}>${producto.precio.toLocaleString()}</p>
                                <button 
                                    className={styles.btnComprar} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAgregarAlCarrito(producto);
                                    }}
                                >
                                    Comprar
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default ItemListContainer;

