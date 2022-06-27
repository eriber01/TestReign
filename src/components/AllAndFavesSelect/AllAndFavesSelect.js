import React from "react";
import './AllAndFavesSelect.css'


export const AllAndFavesSelect = ({ state, actions }) => {


    return (
        <div className="input-container">

            <div className={`Rectangle ${state.allActive ? 'Rectangle-Active' : 'Rectangle-Disabled'}`}>
                <label className={`All ${state.allActive ? 'label-Active' : 'label-Disabled'}`}>
                    All
                    <input
                        checked={state.allActive}
                        onChange={({ target: { checked } }) => {
                            actions.dispatch({
                                type: 'CHANGE_ACTIVE',
                                path: 'allActive',
                                payload: checked
                            })
                        }}
                        type="radio"
                        name="filter"
                    />
                </label>

            </div>
            <div className={`Rectangle ${state.favesActive ? 'Rectangle-Active' : 'Rectangle-Disabled'}`} >
                <label className={`My-faves ${state.favesActive ? 'label-Active' : 'label-Disabled'}`}>
                    My faves
                    <input /* style={{ display: 'none' }} */
                        checked={state.favesActive}
                        onChange={({ target: { checked } }) => {
                            actions.dispatch({
                                type: 'CHANGE_ACTIVE',
                                path: 'favesActive',
                                payload: checked
                            })
                        }}
                        type="radio"
                        name="filter"
                    />
                </label>
            </div>
        </div>
    )
}