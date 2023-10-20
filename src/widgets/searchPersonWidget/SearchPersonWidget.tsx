import React, { useRef, useState } from 'react';
import useGetData from '../../customHooks/useGetData';
import { Tpeople } from '../../models/peopleModel';
import './SearchPersonWidget.scss';
import { Link } from 'react-router-dom';

function SearchPersonWidget() {
  const [personSearchStr, setPersonSearchStr] = useState('');
  const {data} = useGetData<Tpeople>(
    personSearchStr === ''
      ? ''
      : `https://swapi.dev/api/people/?search=${ personSearchStr }`
  );
  const [isFocus, setIsFocus] = useState(false)

  const handleChange = (value: string) => {
    setPersonSearchStr(value);
  }
  const handleFocus = (value: boolean) => {
    setIsFocus(value);
  }

  const handleBlur = () => {
    // Используйте таймаут, чтобы задержать скрытие списка
    const timeoutId = setTimeout(() => {
      setIsFocus(false);
      setPersonSearchStr('');
    }, 100); // Задержка в миллисекундах (в данном случае 200 мс)
  }
  const className = 'search-person-widget'

  return (
    <div className={className}>
      <input
        className={`${className}__input`}
        value={ personSearchStr }
        type='text'
        onChange={ (event) => handleChange(event.target.value) }
        onFocus={() => handleFocus(true)}
        onBlur={handleBlur}
      />
      { isFocus && data && <ul className={ `${ className }__persons-list` }>
        { data?.results && data.results.map(item => <li
          key={ item.name }
          className={ `${ className }__persons-list-item` }
          onClick={() => console.log(item)}
        >
          { <Link to={item.url}>{ item.name }</Link> }
        </li>) }
      </ul> }
    </div>
  );
}

export default SearchPersonWidget;
