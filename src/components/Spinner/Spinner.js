import React from 'react'
import './Spinner.css'


export const Spinner = ({ state }) => {
    return (
        <div className='spinner-container'>
            {
                state.techSelected ?
                    <div className='spinner'></div>
                    :
                    null
            }
        </div>
    )
}
