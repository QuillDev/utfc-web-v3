import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useCreateSocketUserMutation } from "../generated/graphql";
import { AutoGameProgressBar } from "./AutoGameProgressBar";
import ElementOverlay from "./ElementOverlay";
import {
  subscribeClickReceivedEvent,
  subscribeMobDeathEvent,
  subscribeLevelUpEvent,
  subscribeSocketConnectEvent,
  sendClickEvent,
  subscribeFetchPlayerDataResponse,
  fetchPlayerData,
  isSocketBound,
} from "./socket-methods/initializeSocket";
import { InitialDataPayload } from "./socket-methods/payloadTypes";

export const GameWindow: React.FC = () => {
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(0);
  const [mobHP, setMobHP] = useState(0);
  const [mobMaxHP, setMobMaxHp] = useState(0);
  const [xp, setXP] = useState(0);
  const [xpNeeded, setXpNeeded] = useState(0);
  const [createSocketUser] = useCreateSocketUserMutation();
  const [loading, setLoading] = useState(true);
  const setInitialGameState = (pl: InitialDataPayload) => {
    setMobHP(pl.mobHP);
    setMobMaxHp(pl.mobMaxHP);
    setCoins(pl.coins);
    setXP(pl.xp);
    setXpNeeded(pl.xpNeeded);
    setLevel(pl.level);
    setLoading(false);
  };

  //Runs on initial page mount
  useEffect(() => {
    subscribeFetchPlayerDataResponse((pl) => setInitialGameState(pl));
    subscribeClickReceivedEvent((pl) => setMobHP(pl.mobHP));
    subscribeSocketConnectEvent(createSocketUser);
    subscribeMobDeathEvent((pl) => {
      setXP(pl.xp);
      setCoins(pl.coins);
    });

    subscribeLevelUpEvent((pl) => {
      setXP(pl.xp);
      setLevel(pl.level);
      setXpNeeded(pl.xpNeeded);
      setMobMaxHp(pl.mobMaxHP);
    });

    //if the socket is already connected, then we ask for player data immediately
    if(isSocketBound()){
      fetchPlayerData();
    }
  }, []);

  if(loading){
    return <p>LOADING...</p>
  }
  const render = () => {
    return(
      <>
      <p className="text-center">
        Game Data
        <br />
        Coins: {coins}
        <br />
        Level: {level}
        <br />
      </p>

      <div className="text-center">
        <ElementOverlay />
        <div className="m-auto text-center w-1/2">
          <AutoGameProgressBar
            total={mobMaxHP}
            value={mobHP}
            unit={"HP"}
            label={"top"}
          />
          <AutoGameProgressBar
            total={xpNeeded}
            value={xp}
            unit={"XP"}
            barColor={"bg-green-600"}
            hitColor={"bg-green-400"}
            label={"bottom"}
            labelClass={"text-left"}
          />
        </div>
        <button 
        className={"bg-dark-darkest pl-2 pr-2 p-1"}
        onClick={sendClickEvent}
        >ATTACK!</button>
      </div>
    </>
    );
  }
  return (render());
};
