import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import Form from "../components/Phonebook/Form";
import Numbers from "../components/Phonebook/Numbers";
import Notification from "../components/Notification";
import { searchInArray, validatePerson, changeMessage } from "../Utils";
import Search from "../components/Search";
import personService from "../services/persons";

const content = {
  phoneTitle: "Add new person to Phonebook",
  numbersTitle: "Numbers:",
  addButton: {
    text: "Add",
    color: "green",
  },

  inputName: "Name:",
  inputNumber: "Number:",
  inputSearch: "Search by name or number:",
  initialPersons: [
    // { name: "Arto Hellas", number: "040-123456" },
    // { name: "Ada Lovelace", number: "39-44-5323523" },
  ],
};

export default function Phonebook() {
  const {
    phoneTitle,
    numbersTitle,
    addButton,
    inputName,
    inputNumber,
    initialPersons,
    inputSearch,
  } = content;
  const [persons, setPersons] = useState(initialPersons);
  const [filteredPersons, setFilteredPersons] = useState(initialPersons);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        changeMessage(
          `Person '${newPerson.name}' added successfuly`,
          setNotificationMessage
        );
      })
      .catch((err) => {
        console.error(err.response.data);
        changeMessage(err.response.data.error, setErrorMessage);
      });
  };

  const removePerson = (id) => {
    const removedPersonName = persons.filter((p) => p.id === id)[0].name;
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        changeMessage(
          `Person '${removedPersonName}' removed successfuly`,
          setNotificationMessage
        );
      })
      .catch((err) => {
        console.error(err);
        changeMessage(
          `Person '${removedPersonName}' has been removed from server`,
          setErrorMessage
        );
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const updateNumber = (id, newPerson) => {
    personService
      .update(id, newPerson)
      .then((res) => {
        const newPersons = persons.map((p) => (p.id === res.id ? res : p));
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
        changeMessage(
          `Person '${newPerson.name}' updated successfuly`,
          setNotificationMessage
        );
      })
      .catch((error) => {
        changeMessage(error.response.data.error, setErrorMessage);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  useEffect(() => {
    setFilteredPersons(searchInArray(persons, search));
  }, [persons, search]);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => console.error("Something went wrong", err));
  }, []);

  const handleAddPerson = (e) => {
    e.preventDefault();

    const errors = validatePerson(persons, newNumber, newName);
    const { name, number } = errors;

    if (name.isEmpty) {
      return window.prompt(`Name cannot be empty`);
    }
    if (number.isEmpty) {
      return window.prompt(`Number cannot be empty`);
    }
    if (name.exist) {
      const result = window.confirm(
        `${newName} already exist. Do you really want to change this contact?`
      );
      return result && handleUpdateNumber();
    }
    if (number.exist) {
      return window.prompt(`${newNumber} already exist.`);
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    addPerson(newPerson);
  };

  const handleUpdateNumber = () => {
    const id = persons.filter((p) => p.name === newName)[0].id;
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    updateNumber(id, newPerson);
  };

  const handleRemovePerson = (id) => {
    const result = window.confirm("Do you really want to delete this contact?");
    result && removePerson(id);
  };

  const searchConfig = {
    inputSearch,
    search,
    setSearch,
  };

  const formConfig = {
    addButton,
    inputName,
    inputNumber,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    handleAddPerson,
  };
  return (
    <div>
      <Header text={phoneTitle} />
      <Search {...searchConfig} />
      <Notification message={notificationMessage} color="green" />
      <Notification message={errorMessage} color="red" />
      <Form {...formConfig} />
      <Header text={numbersTitle} />
      <Numbers persons={filteredPersons} remove={handleRemovePerson} />
    </div>
  );
}
