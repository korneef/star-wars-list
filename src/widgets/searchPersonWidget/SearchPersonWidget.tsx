import React, { useState } from 'react';
import useGetData from '../../customHooks/useGetData';
import { Tpeople } from '../../models/peopleModel';

function SearchPersonWidget() {
  const [personSearchStr, setPersonSearchStr] = useState('');
  const {data} = useGetData<Tpeople>(
    personSearchStr === ''
      ? ''
      : `https://swapi.dev/api/people/?search=${ personSearchStr }`
  );
  console.log(data)

  const handleChange = (value: string) => {
    setPersonSearchStr(value);
  }

  return (
    <div>
      <input
        value={ personSearchStr }
        type='text'
        onChange={ (event) => handleChange(event.target.value) }
      />
      <ul>
        {data?.results && data.results.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default SearchPersonWidget;
