export interface MapRangeOptions{
    inputValue: number;
    outputMin: number;
    outputMax: number;
    inputMin: number;
    inputMax: number;
}


export function mapRange(options: MapRangeOptions){
    const {inputValue, outputMin, outputMax, inputMin, inputMax} = options;

    const result = ((inputValue - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;

    if (result === Infinity){
        return 0
    }

    return result;
}
