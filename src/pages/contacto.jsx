import React from "react";
import Footer from "../components/footer";
import telefonoIcon from "../iconos/llamada-telefonica.png";
import correoIcon from "../iconos/correo-electronico.png";
import ubicacionIcon from "../iconos/ubicacion.png";
import styles from "./Contacto.module.css";

const Contacto = () => {
    return (
        <div className={styles.body}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Contacto</h1>
                        <div className={styles.info}>
                            <div className={styles.item}>
                                <img src={telefonoIcon} alt="Teléfono" />
                                <a href="tel:+123456789">+1 234 567 89</a>
                            </div>
                            <div className={styles.item}>
                                <img src={correoIcon} alt="Correo" />
                                <a href="mailto:contacto@ejemplo.com">contacto@ejemplo.com</a>
                            </div>
                            <div className={styles.item}>
                                <img src={ubicacionIcon} alt="Dirección" />
                                <span>San Isidro, Buenos Aires</span>
                            </div>
                        </div>
                        <div className={styles.mapWrapper}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.8160947846573!2d-58.52207258477079!3d-34.47330718049965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb0109ff4b6f3%3A0x4567d7a3e8d73d6e!2sSan%20Isidro%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1615333456789!5m2!1ses-419!2sar"
                                allowFullScreen
                                loading="lazy"
                                title="mapa"
                                className={styles.map}
                            ></iframe>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h1 className={styles.title}>Escribinos tu consulta</h1>
                        <form action="https://formspree.io/f/{FORM_ID}" method="POST" className={styles.form}>
                            <div className={styles.field}>
                                <label htmlFor="name">Nombre</label>
                                <input id="name" name="name" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" required />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="message">Consulta</label>
                                <textarea id="message" name="message"></textarea>
                                <p className={styles.note}>Te responderemos en un plazo de 1 a 2 días hábiles</p>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contacto;


