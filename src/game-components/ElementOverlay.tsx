import * as React from "react";

import fireEmblem from "../assets/element-emblems/game-fire-emblem.png";
import waterEmblem from "../assets/element-emblems/game-water-emblem.png";
import earthEmblem from "../assets/element-emblems/game-earth-emblem.png";
import lightEmblem from "../assets/element-emblems/game-light-emblem.png";
import darkEmblem from "../assets/element-emblems/game-dark-emblem.png";
import mysticEmblem from "../assets/element-emblems/game-mystic-emblem.png";

import "./ElementHud.css"

const ElementOverlay = () => {
    
    const type = null;
    //TODO Implement
    const createTypeLabel = (_ignored?:any , _ignored2?:any) => {
        return `0%`;
    }
    
    return (
        <>
            <div className="hud-element-container">
                <div className="hud-element">
                    <img className={"hud-element-emblem"} src={fireEmblem} alt={""}/>
                    {createTypeLabel("fire", type)}
                </div>
                <div className="hud-element">
                    <img className={"hud-element-emblem"} src={waterEmblem} alt={""}/>
                    {createTypeLabel("water", type)}
                </div>
                <div className="hud-element">
                    <img className={"hud-element-emblem"} src={earthEmblem} alt={""}/>
                    {createTypeLabel("earth", type)}
                </div>
                <div className="hud-element">
                    <img className={"hud-element-emblem"} src={lightEmblem} alt={""}/>
                    {createTypeLabel("light", type)}
                </div>
                <div className="hud-element">
                    <img className={"hud-element-emblem"} src={darkEmblem} alt={""}/>
                    {createTypeLabel("dark", type)}
                </div>
                <div className="hud-element">
                    <img className={"hud-element-emblem"} src={mysticEmblem} alt={""}/>
                    {createTypeLabel("mystic", type)}
                </div>
            </div>
        </>
    );
}

export default ElementOverlay;