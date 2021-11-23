import React, { Component } from "react";
import shortid from "shortid";
import Contacts from "../Contacts/Contacts";
import Filter from "../Filter/Filter";
import styles from "./Form.module.css";

class Form extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    name: "",
    phoneNumber: "",
    filter: "",
  };
  nameInputId = shortid.generate();
  phoneInputId = shortid.generate();

  componentDidMount() {
    // console.log('App componentDidMount');

    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  handleInputContactChange = (event) => {
    const { name, value } = event.currentTarget;

    this.setState(() => {
      return { [name]: value };
    });
  };

  handleInputPhoneChange = (event) => {
    const { value } = event.currentTarget;

    this.setState(() => {
      return { phoneNumber: value };
    });
  };

  changeFilter = (event) => {
    const { value } = event.currentTarget;
    this.setState(() => {
      return { filter: value };
    });
  };

  handleSubmite = (e) => {
    e.preventDefault();
    const idContact = shortid.generate();
    const { name, phoneNumber } = this.state;
    if (this.state.contacts.some((nameEl) => nameEl.name === name)) {
      this.reset();
      return alert("Name is already in contacts");
    }
    const contact = {
      name: name,
      number: phoneNumber,
      id: idContact,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));

    this.reset();
  };

  getFilterContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) => {
      return contact.name.includes(normalizedFilter);
    });
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  reset = () => {
    this.setState({ name: "", phoneNumber: "", filter: "" });
  };

  render() {
    const visibleContacts = this.getFilterContact();

    return (
      <>
        <form onSubmit={this.handleSubmite} className={styles.form}>
          <label htmlFor={this.nameInputId} className={styles.label}>
            Name
            <input
              id={this.nameInputId}
              className={styles.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              value={this.state.name}
              onChange={this.handleInputContactChange}
              required
            />
          </label>
          <label htmlFor={this.phoneInputId} className={styles.label}>
            Number
            <input
              id={this.phoneInputId}
              className={styles.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              value={this.state.phoneNumber}
              onChange={this.handleInputPhoneChange}
              required
            />
          </label>
          <button className={styles.btn} type="submit">
            Add contact
          </button>
        </form>
        <Filter
          nameFilter={this.state.filter}
          onChangeFilter={this.changeFilter}
        />
        {this.state.filter === "" ? (
          <Contacts
            contactNames={this.state.contacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <Contacts
            contactNames={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </>
    );
  }
}

export { Form };
