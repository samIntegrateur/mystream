import React, { PropsWithChildren } from 'react';
import { formatDebit } from '../../shared/utils';
import moment from 'moment';

interface TooltipProps {
    active: boolean;
    type: string;
    payload: any; // todo: see the type provided
    label: string;
}

// todo : as the component is rerender very often,
// we should do something at least for fn calls in render
// maybe even better with useMemo or useCallback
const CapacityTooltip: React.FC<PropsWithChildren<TooltipProps>> = (props) => {

    // if (props.active) {
    //     console.log('props', props);
    // }

    const formatDate = (timestamp: number): string => {
        return moment(timestamp).format('dddd, MMMM Do, YYYY hh:mm A');
    };

    if (!props.active) {
        return null;
    }

    return (
        <div style={{ background: 'white', padding: '10px', boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)' }}>
            <p>
                <strong>
                    { formatDate(parseFloat(props.label)) }
                </strong>
            </p>

            { !!props.payload[0] &&
                <p>
                    <span>
                        { props.payload[0].dataKey }
                      &nbsp;:
                    </span>
                    <span>
                        { formatDebit(props.payload[0].value) }
                    </span>
                </p>
            }

            {!!props.payload[1] &&
                <p>
                     <span>
                         {props.payload[1].dataKey}
                       &nbsp;:
                     </span>
                    <span>
                        {formatDebit(props.payload[1].value)}
                    </span>
                </p>
            }
        </div>
    );
}

export default CapacityTooltip;
