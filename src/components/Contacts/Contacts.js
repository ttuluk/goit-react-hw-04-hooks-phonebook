import React from "react";
import styles from "./Contacts.module.css";

const Contacts = ({ contactNames, onDeleteContact }) => {
  return (
    <section className={styles.contacts}>
      <h2 className={styles.title}>Contacts</h2>
      <ul className={styles.contacts_list}>
        {contactNames.map((elem) => {
          return (
            <li key={elem.id} className={styles.contacts_item}>
              {elem.name}: {elem.number}
              <button
                className={styles.btn_delete}
                type="button"
                onClick={() => onDeleteContact(elem.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Contacts;
