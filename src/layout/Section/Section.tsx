import React from 'react';
import Container from '../Container/Container';

const Section: React.FC = (props) => {

    return (
        <section className="section">
            <Container>
                {props.children}
            </Container>
        </section>
    );
};

export default Section;
