// import React, { useState, useEffect, useRef, useCallback } from "react";
import { AllAndFavesSelect } from "../../components/AllAndFavesSelect/AllAndFavesSelect";
import { TechSelect } from "../../components/TechSelect/TechSelect";
import { HandlePageNumber } from "../../components/HandlePageNumber/HandlePageNumber";
import { Spinner } from "../../components/Spinner/Spinner";

import './home.css'
import { UseActions } from "../useActions";

export const Home = () => {

    const [{ state }, actions] = UseActions()

    return (

        <div>
            <AllAndFavesSelect
                state={state}
                actions={actions}
            />

            {
                state.allActive ?
                    <TechSelect
                        state={state}
                        actions={actions}
                    />
                    :
                    null
            }

            {
                !state.loading ?
                    <div id="scroll" className="post-container">
                        {
                            state.queryData?.map((item, index) => (
                                <div className="post-info" key={item.objectID} onClick={({ target }) =>
                                    actions.redirectFn(item.story_url, target)
                                }>
                                    <div className="post-info-data">
                                        <div className="post-info-text">
                                            <img src="/images/time-ico.svg" alt="" />
                                            <span>{`${actions.transformDate(item.created_at)} hours ago by ${item.author}`}</span>
                                        </div>
                                        <div className="history-title">
                                            <span>{item.story_title}</span>
                                        </div>
                                    </div>
                                    <div className="post-info-faves">
                                        <img id={item.objectID}
                                            onClick={({ target }) => actions.addFavorite(target)}
                                            src={
                                                actions.isFaveFn(item.isFave, item.objectID) ? '/images/ico-favorite-enabled.svg' : '/images/ico-favorite-disabled.svg'
                                            } alt=""
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <Spinner state={state} />
            }

            {
                !state.favesActive ?
                    <HandlePageNumber
                        state={state}
                        actions={actions}
                    />
                    :
                    null
            }
        </div>
    )
}