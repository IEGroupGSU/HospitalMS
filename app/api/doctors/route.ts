import { NextResponse } from 'next/server';
import executeQuery from '../../../lib/db';
import { QueryResultRow } from 'pg';

interface Doctor extends QueryResultRow {
    doctor_id: number;
    first_name: string | null;
    last_name: string | null;
    department_id: string | null;
}

export async function GET() {
    try {
        const result = await executeQuery<Doctor>({
            query: 'SELECT * FROM doctors',
            values: [],
        });
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching patients' },
            { status: 500 }
        );
    }
}