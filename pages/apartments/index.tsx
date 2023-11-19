import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Apartment {
  id: number;
  title: string;
}

const ApartmentsPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await fetch('/apartments');
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  return (
    <div>
      <h1>Apartment Listing</h1>
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>{apartment.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApartmentsPage;