import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import styles from './productos.module.css';
import Footer from '../components/footer';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/productos.json')
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar el archivo JSON');
                return res.json();
            })
            .then(data => {
                const found = data.find(p => p.id === parseInt(id));
                if (!found) throw new Error('Producto no encontrado');
                setProducto(found);
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }, [id]);

    if (error) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Error al cargar el producto.</p>;
    if (!producto) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Cargando producto...</p>;

    const handleAgregarAlCarrito = (producto) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        window.dispatchEvent(new Event("carritoActualizado"));

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <>
            <div className={`container my-5 ${styles.itemContainer}`}>
                <h2 className={styles.titulo}>{producto.nombre}</h2>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className={`img-fluid ${styles.cardImg}`}
                        />
                    </div>
                    <div className="col-md-6">
                        <p className="text-muted">${producto.precio.toLocaleString()}</p>
                        <p>{producto.descripcion || 'Este producto no tiene descripción disponible.'}</p>
                        <button 
                            className="btn btn-primary me-2" 
                            onClick={() => handleAgregarAlCarrito(producto)}
                        >
                            Agregar al carrito
                        </button>
                        <Link to="/category/all" className="btn btn-outline-secondary mt-2">
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


