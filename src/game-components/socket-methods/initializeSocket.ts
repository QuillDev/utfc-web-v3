import io from 'socket.io-client';
import { accessToken } from '../../pages/accessToken';
import { ClickReceivedPayload, InitialDataPayload, LevelUpeventPayload, MobDeathEventPayload } from './payloadTypes';

let socket = io();
let bound = false;
export const initializeSocket = () => {
    socket = io("http://localhost:4000");
    console.log("socket connecting");
    if (socket) {
        socket.on("redirect", (loc: string) => {
            window.location.href = loc;
        });
    }
}

export const subscribeSocketConnectEvent = (createSocketUser: any) => {
    if (!socket) return;

    //log a message for when we connect
    socket.on("connect", async () => {
        try {
            const res = await createSocketUser(
                {
                    variables: {
                        socketId: socket.id,
                    }
                });
            
            //if we failed to create the socket user, log the error
            if (!res.data?.createSocketUser) {
                if (res?.err) {
                    console.error(res.err);
                }
                return console.log("Failed to create socket user...");
            }
            //if we succeeded, bind the socket on the server side
            socket.emit("bind");
            bound = true;
            fetchPlayerData();
        } catch (err) {
            console.error(err);
        }

    });
}

export const subscribeClickReceivedEvent = (cb: (pl: ClickReceivedPayload) => void) => {
    if (!socket) return;

    socket.on("clickReceived", (pl: ClickReceivedPayload) => {
        return cb({
            mobHP: pl.mobHP,
        });
    })
}

export const sendClickEvent = () => {
    if (!socket) return;
    socket.emit("click");
}

export const subscribeMobDeathEvent = (cb: (pl: MobDeathEventPayload) => void) => {
    if (!socket) return;
    socket.on("mobDeathEvent", (pl: MobDeathEventPayload) => {
        cb(pl);
    })
}

export const subscribeLevelUpEvent = (cb: (pl: LevelUpeventPayload) => void) => {
    if (!socket) return;
    socket.on("levelUpEvent", (pl: LevelUpeventPayload) => {
        cb(pl);
    })
}


export const authenticateSocket = (data: any) => {
    if (!socket) {
        return;
    }
    if (!data) {
        return;
    }
    socket.emit("authenticate", accessToken);
    console.log(data, socket.id);
}

export const fetchPlayerData = () => {
    if (!socket) return;
    socket.emit("fetchPlayerData");

}

export const subscribeFetchPlayerDataResponse = (cb:(pl:InitialDataPayload)=>void) => {
    if(!socket) return;
    socket.on("fetchPlayerDataResponse", (pl:InitialDataPayload) => {
        console.log(pl);
        cb(pl)
    })
}

export const isSocketBound = ():Boolean => {
    return bound;
}