import React, { useState } from 'react'
import './HandlePageNumber.css'

export const HandlePageNumber = ({ state, actions }) => {

    const [rangeNumber, setRangeNumber] = useState(0)

    const arrayNumbers = []

    const changeRangeFn = (maxMin) => {
        if (maxMin === 'max') {
            setRangeNumber(rangeNumber + 10)
        } else {
            setRangeNumber(rangeNumber - 10)
        }
    }

    for (let i = 0; i < state.maxPageNumber; i++) {

        if (arrayNumbers.length < 10) {
            arrayNumbers.push(i + rangeNumber)
        }
    }

    return (
        <div className="numberContainer">
            {arrayNumbers[0] > 1 ?
                <div onClick={() => changeRangeFn('min')} className='RectangleNumber'>
                    <span className='numbers'>{'<'}</span>
                </div>
                :
                null
            }
            {
                arrayNumbers.map(item => (
                    <div key={item}
                        className={`${state.pageNumber === item ? 'RectangleNumber-active'
                            :
                            'RectangleNumber-inactive'
                            }
                            RectangleNumber
                            `}>
                        <span onClick={() => {
                            actions.dispatch({
                                type: "CHANGE_FIELD",
                                path: 'pageNumber',
                                payload: item
                            })

                            actions.dispatch({
                                type: "CHANGE_LOADING",
                                payload: true
                            })
                        }}
                            className={`
                                ${state.pageNumber === item ?
                                    'numbers-active' :
                                    'numbers-inactive'}
                                    numbers
                            `}>
                            {item}
                        </span>
                    </div>
                ))
            }

            {
                arrayNumbers[arrayNumbers.length - 1] + 2 < state.maxPageNumber ?
                    <div className='RectangleNumber'>
                        <span onClick={() => changeRangeFn('max')} className='numbers'>{'>'}</span>
                    </div>
                    :
                    null
            }
        </div>
    )
}
