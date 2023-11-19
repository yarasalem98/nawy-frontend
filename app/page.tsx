import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Apartment {
  id: number;
  title: string;
  description: string;
}

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

const CustomLink = ({ href, children }: CustomLinkProps) => {
  return (
    <Link href={href}>
      <div className="custom-link">{children}</div>
    </Link>
  );
};

const HomePage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await axios.get<Apartment[]>('/apartments');
      setApartments(response.data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  return (
    <div className="home-page">
      <h1 className="heading">Welcome to the Apartment App</h1>
      <CustomLink href="/apartments">View Apartments</CustomLink>
      <div className="apartments">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="apartment-item">
            <h3>{apartment.title}</h3>
            <p>{apartment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;