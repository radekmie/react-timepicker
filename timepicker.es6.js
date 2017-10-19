import PropTypes from 'prop-types';
import React from 'react';

export class Timepicker extends React.Component {
    constructor ({hours, minutes, mode}) {
        super(...arguments);

        this.state = {hours, minutes, mode};

        this.onChange = this.onChange.bind(this);
        this.onChangeMode = this.onChangeMode.bind(this);
    }

    componentWillReceiveProps ({hours, minutes, mode}) {
        const diff = {};
        const props = this.props;

        if (props.hours !== hours) diff.hours = hours;
        if (props.minutes !== minutes) diff.minutes = minutes;
        if (props.mode !== mode) diff.mode = mode;

        this.setState(diff);
    }

    render () {
        const {hours, minutes, mode} = this.state;
        const {formatNumber, militaryTime, radius, size} = this.props;

        return (
            <div className="timepicker">
                <Timepicker.Info
                    formatNumber={formatNumber}
                    hours={hours}
                    minutes={minutes}
                    mode={mode}
                    onChangeMode={this.onChangeMode}
                    size={size}
                />

                <Timepicker.Clock
                    hours={hours}
                    minutes={minutes}
                    mode={mode}
                    size={size}
                    formatNumber={formatNumber}
                    onChangeMode={this.onChangeMode}
                    militaryTime={militaryTime}
                    radius={radius}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onChange (hours, minutes) {
        this.setState({hours, minutes});

        if (this.props.onChange)
            this.props.onChange(hours, minutes);
    }

    onChangeMode (mode) {
        this.setState({mode});

        if (this.props.onChangeMode)
            this.props.onChangeMode(mode);
    }
}

Timepicker.HOURS = true;
Timepicker.MINUTES = false;

Timepicker.propTypes = {
    formatNumber: PropTypes.func,
    hours: PropTypes.number,
    militaryTime: PropTypes.bool,
    minutes: PropTypes.number,
    mode: PropTypes.bool,
    onChange: PropTypes.func,
    onChangeMode: PropTypes.func,
    radius: PropTypes.number,
    size: PropTypes.number
};

Timepicker.defaultProps = {
    formatNumber: (value/*, mode */) => value < 10 ? '0' + value : value,
    hours: 0,
    militaryTime: true,
    minutes: 0,
    mode: Timepicker.HOURS,
    radius: 125,
    size: 300
};

export class Info extends React.Component {
    constructor () {
        super(...arguments);

        this.onClickHours = this.onClickHours.bind(this);
        this.onClickMinutes = this.onClickMinutes.bind(this);
    }

    render () {
        const {formatNumber, hours, minutes, mode, size} = this.props;

        return (
            <p className="timepicker-info" style={{width: size}}>
                <span className={`timepicker-info-digits${mode === Timepicker.HOURS ? ' active' : ''}`} onClick={this.onClickHours}>
                    {formatNumber(hours, 'info')}
                </span>
                :
                <span className={`timepicker-info-digits${mode === Timepicker.MINUTES ? ' active' : ''}`} onClick={this.onClickMinutes}>
                    {formatNumber(minutes, 'info')}
                </span>
            </p>
        );
    }

    onClickHours () {
        if (this.props.onChangeMode)
            this.props.onChangeMode(Timepicker.HOURS);
    }

    onClickMinutes () {
        if (this.props.onChangeMode)
            this.props.onChangeMode(Timepicker.MINUTES);
    }
}

Info.propTypes = {
    formatNumber: PropTypes.func.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    mode: PropTypes.bool.isRequired,
    onChangeMode: PropTypes.func,
    size: PropTypes.number.isRequired
};

Timepicker.Info = Info;

export class Clock extends React.Component {
    constructor ({hours, militaryTime, minutes, mode}) {
        super(...arguments);

        this.state = {
            even: true,
            hours: hours % (militaryTime ? 24 : 12),
            minutes: minutes % 60,
            mode: mode,
            positionsHours: this.calculatePositionsHours(),
            positionsMinutes: this.calculatePositionsMinutes()
        };

        this.onHand1 = this.onHand1.bind(this);
        this.onHand2 = this.onHand2.bind(this);
    }

    componentWillReceiveProps ({hours, militaryTime, minutes, mode, radius, size}) {
        const props = this.props;

        if (size !== props.size || radius !== props.radius) {
            this.setState({
                positionsHours: this.calculatePositionsHours(),
                positionsMinutes: this.calculatePositionsMinutes()
            });
        } else if (militaryTime !== props.militaryTime) {
            this.setState({
                positionsHours: this.calculatePositionsHours()
            });
        }

        if (mode !== props.mode)
            this.setState({mode: mode});

        if (hours !== props.hours)
            this.setState({hours: hours % (militaryTime ? 24 : 12)});

        if (minutes !== props.minutes)
            this.setState({minutes: minutes % 60});
    }

    componentDidMount () {
        this.componentDidUpdate({});
    }

    componentDidUpdate (previousProps, previousState) {
        const {militaryTime, mode, size} = this.props;
        const {even, hours, minutes, positionsHours, positionsMinutes} = this.state;

        if (previousProps.mode === mode && previousState.hours === hours && previousState.minutes === minutes)
            return;

        const hand1 = even ? this.hand1 : this.hand2;
        const hand2 = even ? this.hand2 : this.hand1;

        hand1.setAttribute('x2', mode ? positionsHours[hours === 0 ? militaryTime ? 23 : 11 : hours - 1][0] : positionsMinutes[minutes][0]);
        hand1.setAttribute('y2', mode ? positionsHours[hours === 0 ? militaryTime ? 23 : 11 : hours - 1][1] : positionsMinutes[minutes][1]);

        if (previousProps.mode !== mode) {
            hand2.setAttribute('x2', size / 2);
            hand2.setAttribute('y2', size / 2);
        }

        const dx1 = hand1.getAttribute('x1') - hand1.getAttribute('x2');
        const dy1 = hand1.getAttribute('y1') - hand1.getAttribute('y2');
        const dx2 = hand2.getAttribute('x1') - hand2.getAttribute('x2');
        const dy2 = hand2.getAttribute('y1') - hand2.getAttribute('y2');

        const hand1Length = Math.ceil(Math.sqrt(dx1 * dx1 + dy1 * dy1));
        const hand2Length = Math.ceil(Math.sqrt(dx2 * dx2 + dy2 * dy2));

        hand1.style.strokeDasharray  = hand1Length;
        hand2.style.strokeDasharray  = hand2Length;
        hand1.style.strokeDashoffset = hand1Length;
        hand2.style.strokeDashoffset = '0';
        hand1.style.transitionProperty = 'none';
        hand2.style.transitionProperty = 'none';

        hand1.getBoundingClientRect();
        hand2.getBoundingClientRect();
        hand1.style.transitionProperty = 'stroke-dashoffset';
        hand2.style.transitionProperty = 'stroke-dashoffset';
        hand1.style.strokeDashoffset = '0';
        hand2.style.strokeDashoffset = hand2Length;
    }

    render () {
        const size = this.props.size;
        const mode = this.state.mode;

        return (
            <svg height={size} width={size}>
                <line ref={this.onHand1} className="timepicker-hand" x1={size / 2} y1={size / 2} x2={size / 2} y2={size / 2} />
                <line ref={this.onHand2} className="timepicker-hand" x1={size / 2} y1={size / 2} x2={size / 2} y2={size / 2} />

                <g className={`timepicker-${mode ? 'visible' : 'invisible'}`}>
                    {this.renderHoursBubbles()}
                </g>
                <g className={`timepicker-${mode ? 'invisible' : 'visible'}`}>
                    {this.renderMinutesBubbles()}
                </g>
            </svg>
        );
    }

    renderHoursBubbles () {
        const {formatNumber} = this.props;
        const {hours, positionsHours: positions} = this.state;

        const bubbles = [];

        for (let index = 0; index < positions.length; ++index) {
            const x = positions[index][0];
            const y = positions[index][1];

            const hour = (index + 1) % 24;

            const onClick = this.onClickHour(hour);
            const onMouseMove = this.onMouseMoveHour(hour);

            bubbles.push(
                <g
                    className={`timepicker-bubble${hours === hour ? ' active' : ''}`}
                    key={index}
                    onClick={onClick}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseMove}
                >
                    <circle cx={x} cy={y} r={15} />

                    <text x={x} y={y}>
                        {formatNumber(hour, 'clock')}
                    </text>
                </g>
            );
        }

        return bubbles;
    }

    renderMinutesBubbles () {
        const {formatNumber} = this.props;
        const {minutes, positionsMinutes: positions} = this.state;

        const bubbles = [];

        for (let minute = 0; minute < positions.length; ++minute) {
            const x = positions[minute][0];
            const y = positions[minute][1];

            const onClick = this.onClickMinute(minute);
            const onMouseMove = this.onMouseMoveMinute(minute);

            bubbles.push(
                <g
                    className={`timepicker-bubble${minute % 5 ? ' small' : ''}${minutes === minute ? ' active' : ''}`}
                    key={minute}
                    onClick={onClick}
                    onMouseMove={onMouseMove}
                >
                    <circle cx={x} cy={y} r={minute % 5 ? minutes === minute ? 5 : 0 : 15} />

                    {minute % 5 ? (
                        <circle cx={x} cy={y} r={10} />
                    ) : (
                        <text x={x} y={y}>
                            {formatNumber(minute, 'clock')}
                        </text>
                    )}
                </g>
            );
        }

        return bubbles;
    }

    onChange () {
        if (this.props.onChange)
            this.props.onChange(this.state.hours, this.state.minutes);

        if (this.props.onChangeMode)
            this.props.onChangeMode(this.state.mode);
    }

    onClickHour (hours) {
        return (event, preventChangeMode) => {
            if (this.state.hours === hours && preventChangeMode)
                return;

            this.setState({
                even: !this.state.even,
                hours,
                mode: preventChangeMode
                    ? this.state.mode === Timepicker.HOURS ? Timepicker.HOURS : Timepicker.MINUTES
                    : this.state.mode === Timepicker.HOURS ? Timepicker.MINUTES : Timepicker.HOURS
            }, () => this.onChange());
        };
    }

    onClickMinute (minutes) {
        return () => {
            if (this.state.minutes === minutes)
                return;

            this.setState({minutes: minutes, even: !this.state.even}, () => this.onChange());
        };
    }

    onHand1 (hand1) {
        this.hand1 = hand1;
    }

    onHand2 (hand2) {
        this.hand2 = hand2;
    }

    onMouseMoveHour (hours) {
        const onClickHour = this.onClickHour(hours);

        return function (event) {
            const isMouseUp = event.type === 'mouseup';
            if (isMouseUp || event.buttons === 1)
                onClickHour(event, !isMouseUp);
        };
    }

    onMouseMoveMinute (minutes) {
        const onClickMinute = this.onClickMinute(minutes);

        return function (event) {
            if (event.buttons === 1)
                onClickMinute();
        };
    }

    calculatePositionsHours () {
        const {militaryTime, radius, size} = this.props;

        const positions = [];

        for (let index = 1; index <= (militaryTime ? 24 : 12); ++index) {
            positions.push([
                Math.round(size / 2 + radius * (militaryTime ? index > 12 ? 1 : 0.65 : 1) * Math.cos((index % 12 / 6 - 0.5) * Math.PI)),
                Math.round(size / 2 + radius * (militaryTime ? index > 12 ? 1 : 0.65 : 1) * Math.sin((index % 12 / 6 - 0.5) * Math.PI))
            ]);
        }

        return positions;
    }

    calculatePositionsMinutes () {
        const {radius, size} = this.props;

        const positions = [];

        for (let index = 0; index < 60; ++index) {
            positions.push([
                Math.round(size / 2 + radius * Math.cos((index / 30 - 0.5) * Math.PI)),
                Math.round(size / 2 + radius * Math.sin((index / 30 - 0.5) * Math.PI))
            ]);
        }

        return positions;
    }
}

Clock.propTypes = {
    formatNumber: PropTypes.func.isRequired,
    hours: PropTypes.number.isRequired,
    militaryTime: PropTypes.bool.isRequired,
    minutes: PropTypes.number.isRequired,
    mode: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    onChangeMode: PropTypes.func,
    radius: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired
};

Timepicker.Clock = Clock;
