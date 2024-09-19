'use client'
import React, { useState, useEffect } from 'react';

interface Patient {
    patient_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string | null;
    address: string | null;
    phone_number: string | null;
    email: string | null;
}

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await fetch('/api/patients');
                if (!response.ok) {
                    throw new Error('Failed to fetch patients');
                }
                const data = await response.json();
                setPatients(data);
            } catch (err) {
                setError('An error occurred while fetching patients');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPatients();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Patients</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.patient_id}>
                        {patient.first_name} {patient.last_name} - {patient.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}