import React, { useContext, useEffect, useState } from 'react';
import Title from '../../ui/Title/Title';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,  } from 'recharts';
import { API_URL } from '../../shared/const';
import { AuthContext } from '../../shared/AuthContext';
import moment from 'moment';
import { formatBytes, formatDebit, getRange } from '../../shared/utils';
import CapacityTooltip from './CapacityTooltip';

const Capacity: React.FC = () => {

    const userContext = useContext(AuthContext);

    interface GraphDates {
        from: number;
        to: number;
    }

    interface IncomingData {
        cdn: [[number, number] ],
        p2p: [[number, number] ],
    }

    interface SanitizedData {
        date: number,
        cdn: number,
        p2p: number,
    }

    // todo: type it
    const [data, setData] = useState<SanitizedData[]>([]);

    // Maw bandwith value, used to provide recharts domain
    const [maxBand, setMaxBand] = useState<number>(0);

    const [graphDates, setGraphDates] = useState<GraphDates>({
        from: moment().subtract(15, 'day').startOf('day').valueOf(),
        to: moment().valueOf(),
    });

    // nb: expect cdn and p2p to have the same order
    const sanitizeData = (data: IncomingData): SanitizedData[] => {
        return data.cdn.map((cdnItem, index) => {

           if (data.p2p[index][0] === cdnItem[0]) {
               return {
                   date: cdnItem[0],
                   cdn: formatBytes(cdnItem[1]).value,
                   p2p: formatBytes(data.p2p[index][1]).value,
               };
           } else {
               console.warn('date is not the same');
               return {
                   date: 0,
                   cdn: 0,
                   p2p: 0,
               };
           }
        });
    };

    const getMaxBand = (data: SanitizedData[]): number => {
        return data.reduce<number>((prev: number, curr) => {
            return Math.max(prev, curr.cdn, curr.p2p);
        }, 0);
    };

    const formatDate = (timestamp: number): string => {
        return moment(timestamp).format('D. MMM');
    };

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await fetch(`${API_URL}/bandwidth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_token: userContext.token,
                        from: graphDates.from,
                        to: graphDates.to,
                    })
                });

                console.log('response', response);
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error('An error occurred');
                }

                const data = await response.json();
                console.log('data', data);

                const sanitizedData = sanitizeData(data);
                console.log('sanitizedData', sanitizedData);
                const newMaxBand = getMaxBand(sanitizedData);
                console.log('newMaxBand', newMaxBand);

                setMaxBand(newMaxBand);
                setData(sanitizedData);

            } catch (e) {
                console.log('error', e);
            }

        };

        if (userContext.user) {
            fetchData();
        }

    }, [userContext, graphDates]);

    const chart = (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
            >
                <XAxis
                    dataKey="date"
                    scale="time"
                    domain={[graphDates.from, graphDates.to]}
                    type="number"
                    // todo: why last day is not displayed ?
                    ticks={getRange(graphDates.from, graphDates.to, 'days')}
                    interval={0}
                    tickFormatter={formatDate} />

                <YAxis
                    domain={[0, maxBand]}
                    type="number"
                    interval={0}
                    allowDecimals={true}
                    tickCount={4}
                    scale="linear"
                    padding={{top: 10, bottom: 0}}
                    tickFormatter={formatDebit}
                />

                <Tooltip content={CapacityTooltip} />

                <Area type="monotone"
                      dataKey="p2p"
                      strokeWidth={2}
                      stroke="steelblue"
                      fill="skyblue"
                      fillOpacity={100} />
                <Area type="monotone"
                      dataKey="cdn"
                      strokeWidth={2}
                      stroke="firebrick"
                      fill="indianred"
                      fillOpacity={100} />
            </AreaChart>
        </ResponsiveContainer>
    )

    return (
        <>
            <Title tag="h2" type="title3">
                Capacity offload
            </Title>
            {chart}
        </>
    )

};

export default Capacity;
