import React from 'react';
import './App.css';
import Layout from './layout/Layout';
import Section from './layout/Section/Section';
import Title from './ui/Title/Title';
import Capacity from './components/Capacity/Capacity';
import Concurrent from './components/Concurrent/Concurrent';

function App() {
  return (
    <Layout>
        <Section>
            <Title tag="h1" type="title1">
                Welcome aboard&nbsp;!
            </Title>
        </Section>gi
        <Section>
            <Capacity />
        </Section>
        <Section>
            <Concurrent />
        </Section>
    </Layout>
  );
}

export default App;
