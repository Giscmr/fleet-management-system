class PersonService {
    constructor() {
        this.persons = []; // This will act as our in-memory database
    }

    // Create a new person record
    createPerson(person) {
        this.persons.push(person);
        return person;
    }

    // Read all person records
    getAllPersons() {
        return this.persons;
    }

    // Read a single person record by ID
    getPersonById(id) {
        return this.persons.find(person => person.id === id);
    }

    // Update a person record by ID
    updatePerson(id, updatedPerson) {
        const index = this.persons.findIndex(person => person.id === id);
        if (index !== -1) {
            this.persons[index] = { ...this.persons[index], ...updatedPerson };
            return this.persons[index];
        }
        return null;
    }

    // Delete a person record by ID
    deletePerson(id) {
        const index = this.persons.findIndex(person => person.id === id);
        if (index !== -1) {
            return this.persons.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = PersonService;
