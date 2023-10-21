import React, { useState } from 'react';
import useGetData from '../../customHooks/useGetData';
import { Tpeople } from '../../models/peopleModel';
import './SearchPersonWidget.scss';
import { Link } from 'react-router-dom';
import { Button } from 'shared';

function SearchPersonWidget() {
  const [personSearchStr, setPersonSearchStr] = useState({
    searchStr: '',
    pageStr: '1',
  });
  const {data, isLoading} = useGetData<Tpeople>(
    personSearchStr.searchStr === ''
      ? ''
      : `https://swapi.dev/api/people/?search=${ personSearchStr.searchStr }&page=${ personSearchStr.pageStr }`
  );
  const [isFocus, setIsFocus] = useState(false)

  const handleChange = (value: string) => {
    setPersonSearchStr(prevState => {
      return {...prevState, searchStr: value}
    });
  }
  const handleFocus = (value: boolean) => {
    setIsFocus(value);
  }

  const handleClose = () => {
    setIsFocus(false);
  }
  const className = 'search-person-widget';
  const searchPageChange = (url: string | null) => {
    if (url === null) return;
    const match = url.match(/page=(\d+)/);

    if (match) {
      const pageNumber = match[1];
      setPersonSearchStr(prevState => {
        return {...prevState, pageStr: pageNumber}
      })
    }
  }
  const getPersonId = (url: string | null): string => {
    if (url === null) return '';
    const match = url.match(/people\/(\d+)\/?$/);
    if (match) return match[1];
    return ''
  }
  return (
    <div className={ className }>
      <input
        className={ `${ className }__input` }
        value={ personSearchStr.searchStr }
        type='text'
        onChange={ (event) => handleChange(event.target.value) }
        onFocus={ () => handleFocus(true) }
      />
      { isFocus && data && <div
        className={ `${ className }__persons-list-wrapper` }
      >
        <div className={ `${ className }__persons-button-wrapper` }>
          <button onClick={ handleClose }>x</button>
        </div>
        <ul className={ `${ className }__persons-list` }>
          { data?.results && data.results.map(item => <li
            key={ item.name }
            className={ `${ className }__persons-list-item` }
          >
            { <Link className={ `${ className }__persons-list-item-link` }
                    to={ `/peoples/${ getPersonId(item.url) }` }>{ item.name }</Link> }
          </li>) }
        </ul>
        <div className={ `${ className }__persons-button-wrapper` }>{ data.previous &&
          <Button
            onClick={ () => searchPageChange(data.previous) }
            disabled={ isLoading }
          >
            Назад
          </Button> }
          { data.next &&
            <Button
              onClick={ () => searchPageChange(data.next) }
              disabled={ isLoading }
            >
              Вперед
            </Button> }
        </div>
      </div> }
    </div>
  );
}

export default SearchPersonWidget;
