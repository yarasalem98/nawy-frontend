import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Apartment {
  id: number;
  title: string;
  description: string; // Add the description property
}

const ApartmentsPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [newApartment, setNewApartment] = useState<Apartment | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await fetch('http://localhost:3000/apartments');
      const data = await response.json();
      setApartments(data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const handleCreateApartment = async () => {
    try {
      const response = await fetch('http://localhost:3000/apartments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });
      const data = await response.json();
      setNewApartment(data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  return (
    <div>
      <h1>Apartment Listing</h1>
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>
            <Link href={`/apartments/${apartment.id}`}>
              <div>{apartment.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateApartment}>Create Apartment</button>
      </div>
      {newApartment && (
        <div>
          <h2>New Apartment Created:</h2>
          <p>Title: {newApartment.title}</p>
          <p>Description: {newApartment.description}</p>
        </div>
      )}
    </div>
  );
};

export default ApartmentsPage;