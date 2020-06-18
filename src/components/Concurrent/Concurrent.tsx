import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Title from '../../ui/Title/Title';

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

const Concurrent: React.FC = () => {

    const renderLineChart = (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <Line type="monotone" dataKey="uv" stroke="#eb8e21" />
                <YAxis axisLine={false} />
                <XAxis  />
            </LineChart>
        </ResponsiveContainer>
    );

    return (
        <>
            <Title tag="h2" type="title3">
                Concurrent Viewers
            </Title>
            {renderLineChart}
        </>
    )

};

export default Concurrent;
