import { NextResponse } from 'next/server';
import executeQuery from '../../../lib/db';
import { QueryResultRow } from 'pg';

interface Patient extends QueryResultRow {
    patient_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string | null;
    address: string | null;
    phone_number: string | null;
    email: string | null;
}

export async function GET() {
    try {
        const result = await executeQuery<Patient>({
            query: 'SELECT * FROM patients',
            values: [],
        });
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching patients' },
            { status: 500 }
        );
    }
}