// Todo: I'm complicating things as it is equivalent to the ticks methods in d3.js
// As recharts is made with d3, it may be easier to replace moment with it
// See https://github.com/recharts/recharts/issues/1137 for similar case
import moment, { Moment, unitOfTime } from 'moment';

export const getRange = (
    startDate: Date | Moment | number,
    endDate: Date | Moment| number,
    type: unitOfTime.Base,
): number[] => {
    let fromDate = moment(startDate)
    let toDate = moment(endDate)
    let diff = toDate.diff(fromDate, type)
    let range = []
    for (let i = 0; i < diff; i++) {
        range.push(moment(startDate).add(i, type).valueOf())
    }
    return range
}

// Return bandwith data (I considered it as bytes..) to a scaled format (GB)
// original code : https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

type BytesUnit = 'Bytes'| 'KB'| 'MB'| 'GB'| 'TB'| 'PB'| 'EB'| 'ZB'| 'YB';

export const formatBytes = (
    bytes: number,
    forceUnit?: BytesUnit,
): { 
    value: number, 
    unit: BytesUnit,
} => {
    if (bytes === 0) return { value: 0, unit: forceUnit ? forceUnit : 'Bytes' };

    const k = 1024;
    const sizes: BytesUnit[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let i: number;

    if (forceUnit) {
        i = sizes.findIndex(unit => unit === forceUnit);
    } else {
        i = Math.floor(Math.log(bytes) / Math.log(k));
    }

    // return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

    const value = bytes / Math.pow(k, i);

    return { value, unit: sizes[i]}
}

export const formatDebit = (value: number): string => {
    return value.toFixed(2) + ' Gbps';
}
