import {convertSecondsToHMS} from './utils';

describe("Test utils", ()=>{
    it("can convert seconds to HMS", ()=>{
        expect(convertSecondsToHMS(1)).toEqual([0,0,1]);
        expect(convertSecondsToHMS(61)).toEqual([0,1,1]);
        expect(convertSecondsToHMS(3661)).toEqual([1,1,1]);
        expect(convertSecondsToHMS(5000)).toEqual([1,23,20]);
    });
});