export interface Person {
    id: number;
    name: string;
    email: string;
    phone: string;
}

import { Pool } from 'pg';

export class PersonService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            // PostgreSQL configuration goes here
        });
    }

    async getAllPersons(): Promise<Person[]> {
        const res = await this.pool.query('SELECT * FROM persons');
        return res.rows;
    }

    async getPersonById(id: number): Promise<Person | null> {
        const res = await this.pool.query('SELECT * FROM persons WHERE id = $1', [id]);
        return res.rows[0] || null;
    }

    async createPerson(person: Person): Promise<Person> {
        const res = await this.pool.query(
            'INSERT INTO persons (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [person.name, person.email, person.phone]
        );
        return res.rows[0];
    }

    async updatePerson(id: number, person: Partial<Person>): Promise<Person | null> {
        const res = await this.pool.query(
            'UPDATE persons SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
            [person.name, person.email, person.phone, id]
        );
        return res.rows[0] || null;
    }

    async deletePerson(id: number): Promise<void> {
        await this.pool.query('DELETE FROM persons WHERE id = $1', [id]);
    }
}