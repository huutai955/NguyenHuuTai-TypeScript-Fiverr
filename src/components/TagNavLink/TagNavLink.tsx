import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getArrJobByDetailAPI } from '../../redux/reducers/jobReducer';
import { AppDispatch } from '../../redux/store';

type Props = {
    keyNavLink: number,
    name: string,
    id: number
}

export default function TagNavLink({ keyNavLink, name, id }: Props) {
    const [isHovering, setIsHovering] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const nagigate = useNavigate()

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <NavLink onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} to={"/search/searchwithnamelist"} key={keyNavLink} style={{ textDecoration: 'none', color: isHovering ?  '#1dbf73' : '#8c8c8c', fontSize: 14, transition: '0.5s' }} onClick={() => {
            const action = getArrJobByDetailAPI(id)
            dispatch(action);
            window.scrollTo(0, 0)
        }}>{name}</NavLink>
    )
}