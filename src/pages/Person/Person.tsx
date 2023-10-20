import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, Button, PageWrapper, Spinner, Table, TableRow } from 'shared';
import useGetData from '../../customHooks/useGetData';
import { TPerson } from '../../models/presonModel';
import './Person.scss';
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import { addFavoritePerson } from '../../app/store/favoriteSlice';

function Person() {
  const {id} = useParams();
  const {data, isLoading} = useGetData<TPerson>(id ? `${ baseUrl }${ id }` : '');
  const className = 'person-page'
  const favorites = useAppSelector(state => state.favorites.favorites);
  const dispatch = useAppDispatch()
  const isFavorite = useMemo(() => {
    if (data === null) return false;
    return !!favorites.find(item => item.name === data.name);
  }, [data, favorites]);

  return (
    <PageWrapper>
      { isLoading ? <div className={ `${ className }__loader` }><Spinner/></div> :
        data && <div><Table
          headerCellsNames={ ['Данные', 'Значение'] }
          rows={ Object.keys(data).map(key => {
            return <TableRow key={key} cells={ [key, data[key]] }/>;
          }) }
        />
          { !isFavorite && <div className={`${className}__button-wrapper`}>
            <Button onClick={() => {
              dispatch(addFavoritePerson(data))
            }}>Добавить в избранное</Button>
          </div> }
        </div>
      }
    </PageWrapper>
  );
}

export default Person;
