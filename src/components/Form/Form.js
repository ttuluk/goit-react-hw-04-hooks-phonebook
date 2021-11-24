import React, { useState, useEffect } from "react";
import shortid from "shortid";
import Contacts from "../Contacts/Contacts";
import Filter from "../Filter/Filter";
import styles from "./Form.module.css";

export default function Form() {
  const [contacts, setContacts] = useState([
    {
      id: "",
      name: "",
      number: "",
    },
  ]);

  const [nameInput, setNameInput] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const nameInputId = shortid.generate();
  const phoneInputId = shortid.generate();

  useEffect(() => {
    const contacts = window.localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleInputContactChange = (event) => {
    const { value } = event.currentTarget;
    setNameInput(event.currentTarget.value);
  };

  const handleInputPhoneChange = (event) => {
    const { value } = event.currentTarget;
    setPhoneNumber(value);
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    const idContact = shortid.generate();
    const contact = {
      id: idContact,
      name: nameInput,
      number: phoneNumber,
    };

    if (contacts.some((nameEl) => nameEl.name === nameInput)) {
      reset();
      return alert("Name is already in contacts");
    }

    setContacts((prevState) => [...prevState, contact]);
    reset();
  };

  const reset = () => {
    setNameInput("");
    setPhoneNumber("");
  };

  const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterContact = contacts.filter((contact) =>
      contact.name.includes(normalizedFilter)
    );
    return filterContact;
  };

  const deleteContact = (contactId) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(newContacts);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmite}>
        <label htmlFor={nameInputId} className={styles.label}>
          Name
          <input
            id={nameInputId}
            className={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            value={nameInput}
            onChange={handleInputContactChange}
            required
          />
        </label>
        <label htmlFor={phoneInputId} className={styles.label}>
          Number
          <input
            id={phoneInputId}
            className={styles.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            value={phoneNumber}
            onChange={handleInputPhoneChange}
            required
          />
        </label>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>

      <Filter nameFilter={filter} onChangeFilter={changeFilter} />
      {contacts.name !== "" && filter === "" ? (
        <Contacts contactNames={contacts} onDeleteContact={deleteContact} />
      ) : (
        <Contacts
          contactNames={getFilterContact()}
          onDeleteContact={deleteContact}
        />
      )}
    </>
  );
}
