import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const { id } = useParams(); 

    return (
        <div className="container text-center my-5">
        <h2>Detalle del Producto: {id}</h2>
        {/* Aquí puedes agregar lógica para obtener el producto con el id */}
        </div>
    );
    };

export default ItemDetailContainer;
