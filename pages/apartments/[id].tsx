import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Apartment {
  id: number;
  title: string;
  description: string;
}

const ApartmentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    if (id) {
      fetchApartmentDetails();
    }
  }, [id]);

  const fetchApartmentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/apartments/${id}`);
      const data = await response.json();
      setApartment(data);
    } catch (error) {
      console.error('Error fetching apartment details:', error);
    }
  };

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Apartment Details</h1>
      <h2>{apartment.title}</h2>
      <p>{apartment.description}</p>
    </div>
  );
};

export default ApartmentDetailsPage;