import React from "react";
import insta from "../iconos/insta.png";
import facebook from "../iconos/facebook.png";
import youtube from "../iconos/youtube.png";
import twitter from "../iconos/twitter.png";
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.socialIcons}>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <img src={insta} alt="Instagram" className={styles.socialIcon} />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" className={styles.socialIcon} />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <img src={youtube} alt="YouTube" className={styles.socialIcon} />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                    <img src={twitter} alt="Twitter" className={styles.socialIcon} />
                </a>
            </div>

            <h3 className={styles.subscribeTitle}>Suscribite para recibir más noticias y promociones</h3>
            <form className={styles.subscribeForm}>
                <label htmlFor="mail" className="visually-hidden">
                    Correo electrónico
                </label>
                <input id="mail" type="email" placeholder="Ingresa tu mail" required className={styles.emailInput} />
                <input type="submit" value="Enviar" className={styles.submitButton} />
            </form>

            <small className={styles.footerText}>
                &copy; Copyright 2024. Todos los derechos reservados | 
                <a href="/terminos-y-condiciones" className={styles.link}>Términos y Condiciones</a> | 
                <a href="/politicas-de-privacidad" className={styles.link}>Políticas de Privacidad</a> | 
                <a href="/politicas-de-cookies" className={styles.link}>Políticas de Cookies</a>
            </small>
        </footer>
    );
};

export default Footer;

