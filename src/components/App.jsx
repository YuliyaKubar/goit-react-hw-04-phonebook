import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts'));
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    const filterId = contacts.filter(contact => contact.id !== id);
    setContacts([...filterId]);
  };

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2 className={css.contacts}>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList
        onClick={deleteContact}
        contacts={contacts}
        filter={filter}
      />
    </div>
  );
};
