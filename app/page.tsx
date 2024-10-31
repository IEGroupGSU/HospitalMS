'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserMd, FaUserInjured, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

interface Counts {
  doctors: number;
  patients: number;
  appointments: number;
  departments: number;
}

const Home: React.FC = () => {
  const [counts, setCounts] = useState<Counts>({
    doctors: 0,
    patients: 0,
    appointments: 0,
    departments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          patientsResponse,
          doctorsResponse,
          appointmentsResponse,
          departmentsResponse
        ] = await Promise.all([
          fetch('/api/patients'),
          fetch('/api/doctors'),
          fetch('/api/appointments'),
          fetch('/api/departments')
        ]);

        const patients = await patientsResponse.json();
        const doctors = await doctorsResponse.json();
        const appointments = await appointmentsResponse.json();
        const departments = await departmentsResponse.json();

        setCounts({
          doctors: doctors.rows?.length || 0,
          patients: patients.rows?.length || 0,
          appointments: appointments.rows?.length || 0,
          departments: departments.rows?.length || 0
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="home bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Hospital Management System</h1>
        <p className="mt-1 text-sm">Efficient healthcare management at your fingertips</p>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome to Our Hospital</h2>
          <p className="text-gray-600 text-sm">
            Our hospital management system streamlines operations, enhances patient care, and improves overall efficiency. 
            We're committed to providing the best healthcare experience possible.
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FaUserMd className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold">Doctors</h3>
            <p className="text-2xl font-bold text-gray-700">{counts.doctors}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FaUserInjured className="text-3xl text-green-500 mb-2" />
            <h3 className="text-lg font-semibold">Patients</h3>
            <p className="text-2xl font-bold text-gray-700">{counts.patients}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FaCalendarCheck className="text-3xl text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold">Appointments</h3>
            <p className="text-2xl font-bold text-gray-700">{counts.appointments}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FaChartLine className="text-3xl text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold">Departments</h3>
            <p className="text-2xl font-bold text-gray-700">{counts.departments}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/patients" className="bg-blue-500 text-white p-3 rounded-lg text-center hover:bg-blue-600 transition duration-300">
              Manage Patients
            </Link>
            <Link href="/doctors" className="bg-green-500 text-white p-3 rounded-lg text-center hover:bg-green-600 transition duration-300">
              Manage Doctors
            </Link>
            <Link href="/appointments" className="bg-yellow-500 text-white p-3 rounded-lg text-center hover:bg-yellow-600 transition duration-300">
              Manage Appointments
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Our Services</h2>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            <li>Patient Registration and Management</li>
            <li>Doctor Scheduling and Availability</li>
            <li>Appointment Booking and Tracking</li>
            <li>Medical Records Management</li>
            <li>Billing and Invoicing</li>
            <li>Pharmacy Integration</li>
            <li>Laboratory Management</li>
            <li>Reporting and Analytics</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;