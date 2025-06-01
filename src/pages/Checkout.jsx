import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Checkout.module.css";
import Footer from '../components/footer';
import Brief from "../components/Brief";

const Checkout = () => {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        direccion: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(carritoStorage);
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + producto.price * (producto.cantidad || 1), 0);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!formData.nombre || !formData.email || !formData.direccion) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (carrito.length === 0) {
            setError('El carrito está vacío.');
            return;
        }

        setError('');

        Swal.fire({
            icon: 'success',
            title: `Compra finalizada. Total: $${calcularTotal().toLocaleString()}`,
            showConfirmButton: false,
            timer: 1500
        });

        localStorage.removeItem('carrito');
        window.dispatchEvent(new Event('carritoActualizado'));
        setCarrito([]);

        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <>
            <div className={`container my-5 ${styles.checkoutContainer}`}>
                <h2>Checkout</h2>
                <div className={styles.checkoutGrid}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h3>Datos de envío</h3>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre completo"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            name="direccion"
                            placeholder="Dirección"
                            value={formData.direccion}
                            onChange={handleChange}
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className="btn btn-primary">
                            Confirmar compra
                        </button>
                    </form>
                    <Brief carrito={carrito} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;


