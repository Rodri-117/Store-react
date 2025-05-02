import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import styles from '../Cart/CartWidget.module.css';

const CartWidget = () => {
    return (
        <div className={`position-relative ms-3 ${styles.CartWidget}`}>
            <FaShoppingCart size={24} color="white" />
            <span className={`position-absolute top-0 start-100 translate-middle ${styles.badge}`}>
                0
            </span>
        </div>
    );
};

export default CartWidget;


