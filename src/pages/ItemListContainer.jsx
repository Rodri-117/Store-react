import React, { useEffect, useState } from 'react';
import productosData from '../productos.json';
import { useParams } from 'react-router-dom';
import Footer from '../components/footer';
import styles from './productos.module.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const filteredList = category
            ? productosData.filter(prod => prod.categoria === category)
            : productosData;

        setProductos(filteredList);
    }, [category]);

    return (
        <div className={styles.itemContainer}>
            <h1 className={styles.titulo}>Productos</h1>
            <div className={styles.grid}>
                {productos.map((producto) => (
                    <div key={producto.id} className={styles.card}>
                        <img src={producto.imagen} className={styles.cardImg} alt={producto.nombre} />
                        <div className={styles.cardBody}>
                            <h5 className={styles.cardTitle}>{producto.nombre}</h5>
                            <p className={styles.cardPrice}>${producto.precio.toLocaleString()}</p>
                            <button className={styles.btnComprar}>Comprar</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default ItemListContainer;


