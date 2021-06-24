export const padZero = (value) => {
    return value.toString().padStart(2, '0');
};

/**
 * Convert HMS ([hours, minutes, seconds]) to seconds so we can compare
 * @param {*} HMS 
 */
export const convertHMStoSeconds = (HMS)=>{
    const [hours, minutes, seconds] = HMS;
    return hours * 3600 + minutes* 60 + seconds;
}

/**
 * Convert seconds to HMS ([hours, minutes, seconds]) 
 * @param {*The seconds you want to convert} seconds 
 */
export const convertSecondsToHMS = (seconds)=>{
    let hrs = Math.floor((seconds / 3600) % 24);
    let mins= Math.floor((seconds / 60) % 60);
    let secs = seconds % 60;
    return [hrs, mins, secs];
}