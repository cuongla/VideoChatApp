import { store } from "store";
import { setCallState, setLocalStream } from "store/actions/callActions";
import { callStates } from "store/reducers/callReducer";

const constraints = {
    audio: true,
    video: true
}

export const getLocalStream = () => {
    navigator
        .mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            console.log(stream);
            store.dispatch(setLocalStream(stream) as any);
            store.dispatch(setCallState(callStates.CALL_AVAILABLE) as any)
        })
        .catch(err => console.log(err));
}

