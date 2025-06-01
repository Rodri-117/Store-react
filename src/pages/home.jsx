import React, { useEffect, useState } from "react";
import img1 from '/images/ejemplo2.jpeg';
import img2 from '/images/ejemplo9.jpeg';
import img3 from '/images/ejemplo22.jpeg';
import Footer from '../components/footer';
import styles from './Home.module.css';
import { getProductsByIds } from "../services/firebaseServices.js";

const HomePage = () => {
    const carruselImgs = [img1, img2, img3];

    const [galeriaProductos, setGaleriaProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            const ids = [
                "a2emxPlo777aLyJ1eKrQ",
                "iCpfAUDZY2I364P6DsK6",
                "ju3LVTCekrdn0LitGW0t",
                "VekntCIZAf1RBCuk6bpR"
            ];
            const productos = await getProductsByIds(ids);
            setGaleriaProductos(productos);
        };

        cargarProductos();
    }, []);

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
            <main className={styles.main}>
                <section className={styles.carrusel}>
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                        <div className="carousel-inner">
                            {carruselImgs.map((img, i) => (
                                <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                    <img src={img} className="d-block w-100" alt={`modelo${i + 1}`} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                </section>

                <h1 className={styles.titulo}>PRODUCTOS DESTACADOS</h1>

                <section className={styles.grid}>
                    {galeriaProductos.map((producto, i) => (
                        <div key={producto.id} className={styles.card}>
                        <div className={styles.linkCard}>
                            <img src={`/images/${producto.imageId}`} className={styles.cardImg} alt={producto.title}/>
                                <div className={styles.cardBody}>
                                    <h5 className={styles.cardTitle}>{producto.title}</h5>
                                    <p className={styles.cardPrice}>${producto.price}</p>
                                    <button className={styles.btnComprar} onClick={() => handleAgregarAlCarrito(producto)}>Comprar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <Footer />
        </>
    );
};

export default HomePage;



