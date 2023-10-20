import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { Table, TableRow, Button, PageWrapper } from 'shared';
import { removeFavoritePerson } from '../../app/store/favoriteSlice';

function Favorites() {
  const favorites = useAppSelector(state => state.favorites.favorites)
  const dispatch = useAppDispatch()
  return (
    <PageWrapper>
      <div>
        <Table headerCellsNames={ [
          'name',
          'height',
          'mass',
          'hair_color',
          'add to favorite'
        ] }
               rows={ favorites.map(item => <TableRow key={ item.name } cells={
                 [
                   item.name,
                   item.height,
                   item.mass,
                   item.hair_color,
                   <Button onClick={ () => dispatch(removeFavoritePerson(item)) }>Удалить из избранного</Button>
                 ]

               }/>) }
        />
      </div>
    </PageWrapper>
  );
}

export default Favorites;
