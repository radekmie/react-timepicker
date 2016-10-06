'use strict';

if (typeof module === 'object' && module.exports) {
    var React = require('react');
}

var Timepicker = React.createClass({
    displayName: 'Timepicker',

    statics: {
        HOURS:   true,
        MINUTES: false
    },

    propTypes: {
        mode: React.PropTypes.bool,

        size:   React.PropTypes.number,
        radius: React.PropTypes.number,

        hours:   React.PropTypes.number,
        minutes: React.PropTypes.number,

        militaryTime: React.PropTypes.bool,

        onChange:     React.PropTypes.func,
        onChangeMode: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            mode: this.HOURS,

            hours:   0,
            minutes: 0,

            size:   300,
            radius: 125,

            militaryTime: true
        };
    },

    getInitialState: function () {
        var props = this.props;

        var mode    = props.mode;
        var hours   = props.hours;
        var minutes = props.minutes;

        return {
            mode: mode,

            hours:   hours,
            minutes: minutes
        };
    },

    render: function () {
        var state = this.state;
        var props = this.props;

        var mode    = state.mode;
        var hours   = state.hours;
        var minutes = state.minutes;

        var size         = props.size;
        var radius       = props.radius;
        var militaryTime = props.militaryTime;

        var propsInfo  = { hours: hours, minutes: minutes, mode: mode, size: size, onChangeMode: this.onChangeMode };
        var propsClock = { hours: hours, minutes: minutes, mode: mode, size: size, onChangeMode: this.onChangeMode, militaryTime: militaryTime, radius: radius, onChange: this.onChange };

        return React.createElement(
            'div',
            { className: 'timepicker' },
            React.createElement(Timepicker.Info,  propsInfo),
            React.createElement(Timepicker.Clock, propsClock)
        );
    },

    onChange: function (hours, minutes) {
        this.setState({ hours: hours, minutes: minutes });

        if (this.props.onChange) {
            this.props.onChange(hours, minutes);
        }
    },

    onChangeMode: function (mode) {
        this.setState({ mode: mode });

        if (this.props.onChangeMode) {
            this.props.onChangeMode(mode);
        }
    }
});

Timepicker.Info = React.createClass({
    displayName: 'Timepicker.Info',

    propTypes: {
        mode: React.PropTypes.bool.isRequired,

        size: React.PropTypes.number.isRequired,

        hours:   React.PropTypes.number.isRequired,
        minutes: React.PropTypes.number.isRequired,

        onChangeMode: React.PropTypes.func
    },

    render: function () {
        var props = this.props;

        var mode    = props.mode;
        var size    = props.size;
        var hours   = props.hours;
        var minutes = props.minutes;

        return React.createElement(
            'p',
            { className: 'timepicker-info', style: { width: size } },
            React.createElement(
                'span',
                {
                    className: 'timepicker-info-digits' + (mode === Timepicker.HOURS ? ' active' : ''),

                    onClick: this.onClickHours
                },
                hours < 10 ? '0' + hours : hours
            ),
            ':',
            React.createElement(
                'span',
                {
                    className: 'timepicker-info-digits' + (mode === Timepicker.MINUTES ? ' active' : ''),

                    onClick: this.onClickMinutes
                },
                minutes < 10 ? '0' + minutes : minutes
            )
        );
    },

    onClickHours: function () {
        if (this.props.onChangeMode) {
            this.props.onChangeMode(Timepicker.HOURS);
        }
    },

    onClickMinutes: function () {
        if (this.props.onChangeMode) {
            this.props.onChangeMode(Timepicker.MINUTES);
        }
    }
});

Timepicker.Clock = React.createClass({
    displayName: 'Timepicker.Clock',

    propTypes: {
        mode: React.PropTypes.bool.isRequired,

        size:   React.PropTypes.number.isRequired,
        radius: React.PropTypes.number.isRequired,

        hours:   React.PropTypes.number.isRequired,
        minutes: React.PropTypes.number.isRequired,

        militaryTime: React.PropTypes.bool.isRequired,

        onChange:     React.PropTypes.func,
        onChangeMode: React.PropTypes.func
    },

    getInitialState: function () {
        var props = this.props;

        var mode         = props.mode;
        var hours        = props.hours;
        var minutes      = props.minutes;
        var militaryTime = props.militaryTime;

        return {
            hours:   hours % (militaryTime ? 24 : 12),
            minutes: minutes % 60,

            even: true,
            mode: mode,

            positionsHours:   this.calculatePositionsHours(),
            positionsMinutes: this.calculatePositionsMinutes()
        };
    },

    componentWillReceiveProps: function (nextProps) {
        var props = this.props;

        if (nextProps.size !== props.size || nextProps.radius !== props.radius) {
            this.setState({
                positionsHours:   this.calculatePositionsHours(),
                positionsMinutes: this.calculatePositionsMinutes()
            });
        } else if (nextProps.militaryTime !== props.militaryTime) {
            this.setState({
                positionsHours: this.calculatePositionsHours()
            });
        }

        if (nextProps.mode !== props.mode) {
            this.setState({ mode: nextProps.mode });
        }

        if (nextProps.hours !== props.hours) {
            this.setState({ hours: nextProps.hours % (nextProps.militaryTime ? 24 : 12) });
        }

        if (nextProps.minutes !== props.minutes) {
            this.setState({ minutes: nextProps.minutes % 60 });
        }
    },

    componentDidMount: function () {
        this.componentDidUpdate({}, {});
    },

    componentDidUpdate: function (previousProps, previousState) {
        var props = this.props;
        var state = this.state;

        var mode = props.mode;
        var size = props.size;

        var even    = state.even;
        var hours   = state.hours;
        var minutes = state.minutes;

        var positionsHours   = state.positionsHours;
        var positionsMinutes = state.positionsMinutes;

        if (previousProps.mode === mode && previousState.hours === hours && previousState.minutes === minutes) {
            return;
        }

        var hand1 = even ? this.refs.hand1 : this.refs.hand2;
        var hand2 = even ? this.refs.hand2 : this.refs.hand1;

        if (!hand1.setAttribute) hand1 = React.findDOMNode ? React.findDOMNode(hand1) : hand1.getDOMNode();
        if (!hand2.setAttribute) hand2 = React.findDOMNode ? React.findDOMNode(hand2) : hand2.getDOMNode();

        hand1.setAttribute('x2', mode ? positionsHours[hours === 0 ? 23 : hours - 1][0] : positionsMinutes[minutes][0]);
        hand1.setAttribute('y2', mode ? positionsHours[hours === 0 ? 23 : hours - 1][1] : positionsMinutes[minutes][1]);

        if (previousProps.mode !== mode) {
            hand2.setAttribute('x2', size / 2);
            hand2.setAttribute('y2', size / 2);
        }

        var dx1 = hand1.getAttribute('x1') - hand1.getAttribute('x2');
        var dy1 = hand1.getAttribute('y1') - hand1.getAttribute('y2');
        var dx2 = hand2.getAttribute('x1') - hand2.getAttribute('x2');
        var dy2 = hand2.getAttribute('y1') - hand2.getAttribute('y2');

        var hand1Length = Math.ceil(Math.sqrt(dx1 * dx1 + dy1 * dy1));
        var hand2Length = Math.ceil(Math.sqrt(dx2 * dx2 + dy2 * dy2));

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
    },

    render: function () {
        var size = this.props.size;
        var mode = this.state.mode;

        return React.createElement(
            'svg',
            { width: size, height: size },
            React.createElement('line', { ref: 'hand1', className: 'timepicker-hand', x1: size / 2, y1: size / 2, x2: size / 2, y2: size / 2 }),
            React.createElement('line', { ref: 'hand2', className: 'timepicker-hand', x1: size / 2, y1: size / 2, x2: size / 2, y2: size / 2 }),
            React.createElement(
                'g',
                { className: mode ? 'timepicker-visible' : 'timepicker-invisible' },
                this.renderHoursBubbles()
            ),
            React.createElement(
                'g',
                { className: mode ? 'timepicker-invisible' : 'timepicker-visible' },
                this.renderMinutesBubbles()
            )
        );
    },

    renderHoursBubbles: function () {
        var hours     = this.state.hours;
        var positions = this.state.positionsHours;

        var x;
        var y;

        var onClick;
        var onMouseMove;

        var hour;
        var index   = 0;
        var bubbles = [];

        for (; index < positions.length; ++index) {
            x = positions[index][0];
            y = positions[index][1];

            hour = (index + 1) % 24;

            onClick     = this.onClickHour(hour);
            onMouseMove = this.onMouseMoveHour(hour);

            bubbles.push(React.createElement(
                'g',
                {
                    key: index,

                    className: 'timepicker-bubble' + (hours === hour ? ' active' : ''),

                    onClick:     onClick,
                    onMouseUp:   onMouseMove,
                    onMouseMove: onMouseMove
                },
                React.createElement('circle', { cx: x, cy: y, r: 15 }),
                React.createElement(
                    'text',
                    { x: x, y: y },
                    hour
                )
            ));
        }

        return bubbles;
    },

    renderMinutesBubbles: function () {
        var minutes   = this.state.minutes;
        var positions = this.state.positionsMinutes;

        var x;
        var y;

        var onClick;
        var onMouseMove;

        var minute  = 0;
        var bubbles = [];

        for (; minute < positions.length; ++minute) {
            x = positions[minute][0];
            y = positions[minute][1];

            onClick     = this.onClickMinute(minute);
            onMouseMove = this.onMouseMoveMinute(minute);

            bubbles.push(React.createElement(
                'g',
                {
                    key: minute,

                    className: 'timepicker-bubble' + (minute % 5 !== 0 ? ' small' : '') + (minutes === minute ? ' active' : ''),

                    onClick:     onClick,
                    onMouseMove: onMouseMove
                },
                React.createElement('circle', { cx: x, cy: y, r: minute % 5 !== 0 ? minutes === minute ? 5 : 0 : 15 }),
                minute % 5 === 0 ? React.createElement(
                    'text',
                    { x: x, y: y },
                    minute
                ) : React.createElement('circle', { cx: x, cy: y, r: 10 })
            ));
        }

        return bubbles;
    },

    onChange: function () {
        if (this.props.onChange) {
            this.props.onChange(this.state.hours, this.state.minutes);
        }

        if (this.props.onChangeMode) {
            this.props.onChangeMode(this.state.mode);
        }
    },

    onClickHour: function (hours) {
        var self = this;

        return function (event, preventChangeMode) {
            if (self.state.hours === hours && preventChangeMode) {
                return;
            }

            self.setState({
                hours: hours,

                even: !self.state.even,
                mode: preventChangeMode
                    ? self.state.mode === Timepicker.HOURS ? Timepicker.HOURS : Timepicker.MINUTES
                    : self.state.mode === Timepicker.HOURS ? Timepicker.MINUTES : Timepicker.HOURS
            }, function () {
                self.onChange();
            });
        };
    },

    onClickMinute: function (minutes) {
        var self = this;

        return function () {
            if (self.state.minutes === minutes) {
                return;
            }

            self.setState({ minutes: minutes, even: !self.state.even }, function () {
                self.onChange();
            });
        };
    },

    onMouseMoveHour: function (hours) {
        var onClickHour = this.onClickHour(hours);

        return function (event) {
            var isMouseUp = event.type === 'mouseup';
            if (isMouseUp || event.buttons === 1) {
                onClickHour(event, !isMouseUp);
            }
        };
    },

    onMouseMoveMinute: function (minutes) {
        var onClickMinute = this.onClickMinute(minutes);

        return function (event) {
            if (event.buttons === 1) {
                onClickMinute();
            }
        };
    },

    calculatePositionsHours: function () {
        var props = this.props;

        var size         = props.size;
        var radius       = props.radius;
        var militaryTime = props.militaryTime;

        var index     = 1;
        var positions = [];

        for (; index <= (militaryTime ? 24 : 12); ++index) {
            positions.push([
                Math.round(size / 2 + radius * (militaryTime ? index > 12 ? 1 : 0.65 : 1) * Math.cos((index % 12 / 6 - 0.5) * Math.PI)),
                Math.round(size / 2 + radius * (militaryTime ? index > 12 ? 1 : 0.65 : 1) * Math.sin((index % 12 / 6 - 0.5) * Math.PI))
            ]);
        }

        return positions;
    },

    calculatePositionsMinutes: function () {
        var props = this.props;

        var size   = props.size;
        var radius = props.radius;

        var index     = 0;
        var positions = [];

        for (; index < 60; ++index) {
            positions.push([
                Math.round(size / 2 + radius * Math.cos((index / 30 - 0.5) * Math.PI)),
                Math.round(size / 2 + radius * Math.sin((index / 30 - 0.5) * Math.PI))
            ]);
        }

        return positions;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = Timepicker;
}

if (typeof window === 'object') {
    window.Timepicker = Timepicker;
}
