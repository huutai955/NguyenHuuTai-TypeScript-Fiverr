import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getArrTypeOfJobAPI } from '../../redux/reducers/jobReducer'
import { AppDispatch } from '../../redux/store'

type Props = {
    id: number
    name: string
}

export default function TagNavLinkParent({id, name}: Props) {
    const dispatch: AppDispatch = useDispatch()
  return (
        <NavLink to={`/categories/${id}`}  style={{ textDecoration: 'none', color: '#000', fontWeight: 600 }} onClick={() => {
            const action  = getArrTypeOfJobAPI(id);
            dispatch(action)
            window.scrollTo(0, 0)
        }}>{name}</NavLink>
  )
}