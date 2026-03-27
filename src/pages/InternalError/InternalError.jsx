import styles from "./InternalError.module.css";

function InternalError() {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>🚧</span>
      <h1 className={styles.title}>Internal Error</h1>
      <p className={styles.message}>
        Une erreur est survenue. Merci de réessayer plus tard.
      </p>
    </div>
  );
}

export default InternalError;
