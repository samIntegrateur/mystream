import React, { useContext, useEffect } from 'react';
import Title from '../../ui/Title/Title';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { API_URL } from '../../shared/const';
import { AuthContext } from '../../shared/AuthContext';
import moment, { unix, utc } from 'moment';

const Capacity: React.FC = () => {

    const userContext = useContext(AuthContext);

    const data = [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
            name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];

    const fromDate: Number = moment().subtract(15, 'day').valueOf();
    console.log('fromDate', fromDate);

    const toDate: Number = moment().valueOf()
    console.log('toDate', toDate);

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
                        from: fromDate,
                        to: toDate,
                    })
                });

                console.log('response', response);
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error('An error occurred');
                }

                const data = await response.json();
                console.log('data', data);
            } catch (e) {
                console.log('error', e);
            }

        };

        if (userContext.user) {
            fetchData();
        }

    }, [userContext, fromDate, toDate]);

    const chart = (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="midnightblue" strokeWidth={3} fill="royalblue" />
                <Area type="monotone" dataKey="pv" stroke="purple" strokeWidth={3} fill="mediumorchid" />
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
