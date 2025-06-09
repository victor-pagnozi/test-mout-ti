import { IEmitToastEvent } from "@/core/interfaces/IEmitToastEvent";
import { eventEmitter } from "./generateEventEmitter";

export const emitToastEvent = (props: IEmitToastEvent) => {
  eventEmitter.emit("showAlert", props);
};
