import React, { useEffect, useState } from 'react'
import { type TPerson } from 'models/presonModel'
import {
  Table,
  TableRow,
  Button,
  Spinner,
  baseUrl
} from 'shared'
import { SearchPersonWidget } from 'widgets'
import useGetData from '../../customHooks/useGetData';
import { type Tpeople } from '../../models/peopleModel';
import { useNavigate, useParams } from 'react-router-dom';
import './Peoples.scss'


const Peoples: React.FunctionComponent = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const {page} = useParams();
  const [query, setQuery] = useState(() => {
    if (!page) return baseUrl;
    return `${ baseUrl }?page=${ page }`
  })
  const [peoples, setPeoples] = useState<Array<TPerson>>([]);
  const {data, isLoading, isError} = useGetData<Tpeople>(query);
  const navigate = useNavigate();

  useEffect(() => {
    if (data === null || isError) return
    setPeoples(data.results);
    setIsFirstLoading(false)
  }, [data, isError])

  const handlePage = (changePageQuery: string | null) => {
    if (changePageQuery === null) return;
    const regex = /api\/people\/\?page=(\d+)/;
    const match = changePageQuery.match(regex);
    if (!match) return;
    const pageNumber = match[1]
    const newQuery = `${ baseUrl }?page=${ pageNumber }`
    navigate(`/peoples/page/${ pageNumber }`)
    setQuery(newQuery)
  }

  const className = 'peoples'

  return (
    isLoading && isFirstLoading
      ? <div>Loading...</div>
      : (
        <div className={ className }>
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
          <div className={ `${ className }__table-pagination` }>
            <div className={ `${ className }__pages-count-info` }>
              <div className={ `${ className }__current-page` }>Текущая страница: { page ? page : 1 }</div>
              <div className={ `${ className }__pages-count` }>Всего
                страниц: { data?.count && Math.ceil(data.count / 10) }</div>
            </div>
            <div>
              { data?.previous &&
                <Button bemClass={ className } disabled={isLoading} onClick={ () => handlePage(data.previous) }>Назад</Button> }
              { data?.next &&
                <Button bemClass={ className } disabled={isLoading} onClick={ () => handlePage(data.next) }>Вперед</Button> }</div>
          </div>
        </div>
      )
  )
}

export default Peoples
