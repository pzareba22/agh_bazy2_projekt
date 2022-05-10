import {IEvent} from "../constants";

export const calculateWidthPercent = (event: IEvent): number => {
    return Math.floor((event.participants.length / event.maxParticipants) * 100);
};