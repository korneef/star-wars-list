import React from 'react';
import { useParams } from 'react-router-dom';

function Person() {
  const params = useParams();
  console.log(params)
  return (
    <div>Person page</div>
  );
}

export default Person;
