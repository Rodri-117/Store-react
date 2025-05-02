import React from 'react';
import Footer from '../components/footer';
import styles from './Pedidos.module.css';

const Pedidos = () => {
    return (
        <div className={styles.body}>
            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Seguí tu pedido</h1>
                        <div className={styles.iframeWrapper}>
                            <iframe 
                                src="https://www.oca.com.ar/Busquedas/Envios" 
                                width="100%" 
                                height="500px" 
                                title="Seguimiento de pedido"
                                className={styles.iframe}
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Pedidos;

