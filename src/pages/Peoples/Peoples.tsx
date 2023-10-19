import React, { useEffect, useState } from 'react'
import { type TPerson } from 'models/presonModel'
import { Table, TableRow } from 'shared'
import { SearchPersonWidget } from 'widgets'
import useGetData from '../../customHooks/useGetData';
import { type Tpeople } from '../../models/peopleModel';


const Peoples: React.FunctionComponent = () => {
  const [peoples, setPeoples] = useState<Array<TPerson>>([]);
  const [query, setQuery] = useState('https://swapi.dev/api/people/')
  const {data, isLoading, isError} = useGetData<Tpeople>(query);

  useEffect(() => {
    if (data === null || isError) return
    setPeoples(data.results);
  }, [data, isError])

  const handlePage = (changePageQuery: string | null) => {
    if (changePageQuery === null) return;
    setQuery(changePageQuery);
  }

  return (
    isLoading
      ? <div>Loading...</div>
      : (
        <div style={ {
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        } }>
          <SearchPersonWidget/>
          <Table
            headerCellsNames={ [
              'name',
              'height',
              'mass',
              'hair_color',
              'add to favorite'
            ] }
            rows={ peoples.map(item => <TableRow key={ item.name } cells={ [
              item.name,
              item.height,
              item.mass,
              item.hair_color,
              'add'
            ] }/>) }
          />
          { data?.previous && <button onClick={ () => handlePage(data.previous) }>Назад</button> }
          { data?.next && <button onClick={ () => handlePage(data.next) }>Вперед</button> }
        </div>
      )
  )
}

export default Peoples
