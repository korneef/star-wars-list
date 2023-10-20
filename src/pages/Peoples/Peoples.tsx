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
import './Peoples.scss';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { addFavoritePerson, removeFavoritePerson } from '../../app/store/favoriteSlice';


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
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.favorites.favorites)

  useEffect(() => {
    if (data === null || isError) return
    setPeoples(data.results);
    setIsFirstLoading(false)
  }, [data, isError])

  const handlePage = (changePageQuery: string | null | undefined) => {
    if (!changePageQuery) return;
    const regex = /api\/people\/\?page=(\d+)/;
    const match = changePageQuery.match(regex);
    if (!match) return;
    const pageNumber = match[1]
    const newQuery = `${ baseUrl }?page=${ pageNumber }`
    navigate(`/peoples/page/${ pageNumber }`)
    setQuery(newQuery)
  }

  const addToFavorites = (item: TPerson) => {
    dispatch(addFavoritePerson(item))
  }
  const removeFromFavorites = (item: TPerson) => {
    dispatch(removeFavoritePerson(item))
  }

  const favoriteButton = (item: TPerson) => {
    if (!favorites.find(favItem => favItem.name === item.name)) {
      return <Button onClick={ () => addToFavorites(item) }>Добавить в избранное</Button>
    } else {
      return <Button onClick={ () => removeFromFavorites(item) }>Удалить из избранного</Button>
    }
  }

  const className = 'peoples';

  return (
    isLoading && isFirstLoading
      ? <div className={`${className}__loader`}><Spinner/></div>
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
              favoriteButton(item),
            ] }/>) }
          />
          <div className={ `${ className }__table-pagination` }>
            <div className={ `${ className }__pages-count-info` }>
              <div className={ `${ className }__current-page` }>Текущая страница: { page ? page : 1 }</div>
              <div className={ `${ className }__pages-count` }>Всего
                страниц: { data?.count && Math.ceil((data?.count || 10) / 10) }</div>
            </div>
            <div>
              { data?.previous &&
                <Button bemClass={ className } disabled={isLoading} onClick={ () => handlePage(data?.previous) }>Назад</Button> }
              { data?.next &&
                <Button bemClass={ className } disabled={isLoading} onClick={ () => handlePage(data?.next) }>Вперед</Button> }</div>
          </div>
        </div>
      )
  )
}

export default Peoples
