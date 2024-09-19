import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool: Pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

interface QueryParams {
    query: string;
    values?: unknown[];
}

interface QueryResponse<T extends QueryResultRow> {
    rows: T[];
    rowCount: number | null;
}

export async function executeQuery<T extends QueryResultRow>({ query, values = [] }: QueryParams): Promise<QueryResponse<T>> {
    let client;
    try {
        client = await pool.connect();
        const result: QueryResult<T> = await client.query(query, values);
        return { rows: result.rows, rowCount: result.rowCount };
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

export default executeQuery;