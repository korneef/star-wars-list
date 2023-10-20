import React from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, PageWrapper, Table, TableRow } from 'shared';
import useGetData from '../../customHooks/useGetData';
import { TPerson } from '../../models/presonModel';

function Person() {
  const {id} = useParams();
  const { data, isLoading, isError} = useGetData<TPerson>(id ? `${ baseUrl }${ id }` : '');

  return (
    <PageWrapper>
      {data && <Table
        headerCellsNames={ ['Данные', 'Значение'] }
        rows={Object.keys(data).map(key => {
          return <TableRow cells={ [key, data[key]] }/>;
        }) }
      /> }
    </PageWrapper>
  );
}

export default Person;
