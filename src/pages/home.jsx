import React from "react";
import { Link } from "react-router-dom";
import img1 from '/images/ejemplo2.jpeg';
import img2 from '/images/ejemplo9.jpeg';
import img3 from '/images/ejemplo22.jpeg';
import img21 from '/images/ejemplo21.jpeg';
import img2gal from '/images/ejemplo2.jpeg';
import img3gal from '/images/ejemplo3.jpeg';
import img4 from '/images/ejemplo4.jpeg';
import img5 from '/images/ejemplo5.jpeg';
import img6 from '/images/ejemplo6.jpeg';
import Footer from '../components/footer';
import styles from './Home.module.css';

const HomePage = () => {
    const carruselImgs = [img1, img2, img3];
    const galeriaImgs = [img21, img2gal, img3gal, img4, img5, img6];

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
                    {galeriaImgs.map((img, i) => (
                        <div key={i} className={styles.card}>
                            <img src={img} className={styles.cardImg} alt={`Imagen ${i + 1}`} />
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>Producto {i + 1}</h5>
                                <p className={styles.cardPrice}>${(i + 1) * 6000}</p>
                                <button className={styles.btnComprar}>Comprar</button>
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

