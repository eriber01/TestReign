import Select from "react-select";
import './TechSelect.css'

export const TechSelect = ({ state, actions }) => {

    return (
        <div className='select-container'>
            <Select
                className="select"
                defaultValue={JSON.parse(localStorage.getItem('techSelected')) || []}
                options={state.optionSelectData}
                getOptionValue={(option) => option.label}
                formatOptionLabel={options => (
                    <div className="labels">
                        <img src={options.image} alt="" />
                        <span>{options.label}</span>
                    </div>
                )}

                onChange={(selected) => {
                    actions.dispatch({
                        type: 'CHANGE_SELECT',
                        path: 'techSelected',
                        payload: selected
                    })
                    actions.dispatch({
                        type: 'CHANGE_LOADING',
                        payload: true
                    })
                }}
            />
        </div >
    )
}