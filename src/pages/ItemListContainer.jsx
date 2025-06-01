import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import Footer from '../components/footer';
import styles from './productos.module.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const { categoria } = useParams();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const itemListRef = collection(db, 'itemList');
                const snapshot = await getDocs(itemListRef);
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProductos(items);
            } catch (err) {
                console.error('Error al cargar los productos desde Firebase:', err);
            }
        };

        fetchProductos();
    }, []);

    const aumentarCantidad = (producto) => {
        setCantidades(prev => {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const cantidadEnCarrito = carrito
                .filter(p => p.id === producto.id)
                .reduce((acc, p) => acc + (p.cantidad || 1), 0);

            const stockDisponible = producto.stock - cantidadEnCarrito;
            const nuevaCantidad = (prev[producto.id] || 0) + 1;

            if (nuevaCantidad <= stockDisponible) {
                return { ...prev, [producto.id]: nuevaCantidad };
            }
            return prev;
        });
    };

    const disminuirCantidad = (producto) => {
        setCantidades(prev => {
            const nuevaCantidad = (prev[producto.id] || 0) - 1;
            return { ...prev, [producto.id]: nuevaCantidad >= 0 ? nuevaCantidad : 0 };
        });
    };

    const handleAgregarAlCarrito = (producto) => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cantidad = cantidades[producto.id] || 0;

        if (cantidad <= 0) return;

        const productoExistente = carrito.find(p => p.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad = (productoExistente.cantidad || 1) + cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        window.dispatchEvent(new Event("carritoActualizado"));

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            showConfirmButton: false,
            timer: 1500
        });

        setCantidades(prev => ({ ...prev, [producto.id]: 0 }));
    };

    const productosFiltrados = categoria && categoria.toLowerCase() !== "todos"
        ? productos.filter(p => p.categoryId?.toLowerCase() === categoria?.toLowerCase())
        : productos;

    return (
        <div className={styles.itemContainer}>
            <h1 className={styles.titulo}>Productos {categoria ? `- ${categoria}` : ''}</h1>
            <div className={styles.grid}>
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => {
                        const cantidad = cantidades[producto.id] || 0;

                        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                        const cantidadEnCarrito = carrito
                            .filter(p => p.id === producto.id)
                            .reduce((acc, p) => acc + (p.cantidad || 1), 0);

                        const stockDisponible = producto.stock - cantidadEnCarrito;
                        const sinStock = stockDisponible <= 0;
                        const puedeComprar = !sinStock && cantidad > 0 && cantidad <= stockDisponible;

                        return (
                            <div key={producto.id} className={styles.card}>
                                <Link to={`/item/${producto.id}`} className={styles.linkCard}>
                                    <img src={`/images/${producto.imageId}`} className={styles.cardImg} alt={producto.title} />
                                    <div className={styles.cardBody}>
                                        <h5 className={styles.cardTitle}>{producto.title}</h5>
                                        <p className={styles.cardPrice}>${producto.price.toLocaleString()}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                            <button
                                                className={styles.btnComprar}
                                                onClick={(e) => { e.preventDefault(); disminuirCantidad(producto); }}
                                                disabled={cantidad <= 0}
                                            >
                                                -
                                            </button>
                                            <span>{cantidad}</span>
                                            <button
                                                className={styles.btnComprar}
                                                onClick={(e) => { e.preventDefault(); aumentarCantidad(producto); }}
                                                disabled={cantidad >= stockDisponible}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className={styles.btnComprar}
                                            onClick={(e) => { e.preventDefault(); handleAgregarAlCarrito(producto); }}
                                            disabled={!puedeComprar}
                                            style={{ marginTop: '10px', width: '100%' }}
                                        >
                                            {sinStock ? 'Sin stock' : 'Comprar'}
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay productos para mostrar en esta categoría.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ItemListContainer;



