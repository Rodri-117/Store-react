import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import Footer from '../components/footer';
import styles from './productos.module.css';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const docRef = doc(db, 'itemList', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error al obtener el producto de Firebase:', err);
                setError(true);
            }
        };

        fetchProducto();
        setCantidad(0);
    }, [id]);

    if (error) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Error al cargar el producto.</p>;
    if (!producto) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Cargando producto...</p>;

    const handleAgregarAlCarrito = () => {
        if (cantidad === 0) return;

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const index = carrito.findIndex(item => item.id === producto.id);
        if (index !== -1) {
            const nuevaCantidad = Math.min(carrito[index].cantidad + cantidad, producto.stock);
            carrito[index].cantidad = nuevaCantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.dispatchEvent(new Event("carritoActualizado"));

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            showConfirmButton: false,
            timer: 1500
        });

        setCantidad(0); 
    };

    const incrementar = () => {
        if (cantidad < producto.stock) setCantidad(cantidad + 1);
    };

    const decrementar = () => {
        if (cantidad > 0) setCantidad(cantidad - 1);
    };

    return (
        <>
            <div className={`container my-5 ${styles.itemContainer}`}>
                <h2 className={styles.titulo}>{producto.title}</h2>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img
                            src={`/images/${producto.imageId}`}
                            alt={producto.title}
                            className={`img-fluid ${styles.cardImg}`}
                        />
                    </div>
                    <div className="col-md-6">
                        <p className="text-muted">${producto.price.toLocaleString()}</p>
                        <p>{producto.description || 'Este producto no tiene descripción disponible.'}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button className="btn btn-outline-secondary" onClick={decrementar} disabled={cantidad === 0}>
                                -
                            </button>
                            <span style={{ minWidth: '2rem', textAlign: 'center' }}>{cantidad}</span>
                            <button className="btn btn-outline-secondary" onClick={incrementar} disabled={cantidad === producto.stock}>
                                +
                            </button>
                        </div>

                        <button className="btn btn-primary" onClick={handleAgregarAlCarrito} disabled={cantidad === 0}>
                            Agregar al carrito
                        </button>

                        <Link to="/category/todos" className="btn btn-outline-secondary mt-3 d-block">
                            Volver a productos
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ItemDetailContainer;


