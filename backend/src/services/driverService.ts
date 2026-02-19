import { Pool } from 'pg';

export interface Driver {
    id: number;
    person_id: number;
    license_number: string;
    license_expiry: string;
}

export class DriverService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            // PostgreSQL configuration goes here
        });
    }

    async getAllDrivers(): Promise<Driver[]> {
        const res = await this.pool.query('SELECT * FROM drivers');
        return res.rows;
    }

    async getDriverById(id: number): Promise<Driver | null> {
        const res = await this.pool.query('SELECT * FROM drivers WHERE id = $1', [id]);
        return res.rows[0] || null;
    }

    async createDriver(driver: Driver): Promise<Driver> {
        const res = await this.pool.query(
            'INSERT INTO drivers (person_id, license_number, license_expiry) VALUES ($1, $2, $3) RETURNING *',
            [driver.person_id, driver.license_number, driver.license_expiry]
        );
        return res.rows[0];
    }

    async updateDriver(id: number, driver: Partial<Driver>): Promise<Driver | null> {
        const res = await this.pool.query(
            'UPDATE drivers SET person_id = $1, license_number = $2, license_expiry = $3 WHERE id = $4 RETURNING *',
            [driver.person_id, driver.license_number, driver.license_expiry, id]
        );
        return res.rows[0] || null;
    }

    async deleteDriver(id: number): Promise<void> {
        await this.pool.query('DELETE FROM drivers WHERE id = $1', [id]);
    }
}