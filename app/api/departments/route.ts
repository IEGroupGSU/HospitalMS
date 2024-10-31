import { NextResponse } from 'next/server';
import executeQuery from '../../../lib/db';
import { QueryResultRow } from 'pg';

interface Department extends QueryResultRow {
    department_id: number;
    name: string | null;
}

export async function GET() {
    try {
        const result = await executeQuery<Department>({
            query: 'SELECT * FROM departments',
            values: [],
        });
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching departments:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching departments' },
            { status: 500 }
        );
    }
}