import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';



const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Apartment App</h1>
      <Link href="/apartments">
        <div>View Apartments</div>
      </Link>
    </div>
  );
};

export default HomePage;