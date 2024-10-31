import { NextResponse } from 'next/server';
import executeQuery from '../../../lib/db';
import { QueryResultRow } from 'pg';

interface Appointment extends QueryResultRow {
    appointment_id: number;
    patient_id: string | null;
    doctor_id: string | null;
    appointment_date: string | null;
    appointment_time: string | null;
    info: string | null;
}

export async function GET() {
    try {
        const result = await executeQuery<Appointment>({
            query: 'SELECT * FROM appointments',
            values: [],
        });
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching appointments' },
            { status: 500 }
        );
    }
}