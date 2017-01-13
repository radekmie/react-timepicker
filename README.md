[![npm](https://nodei.co/npm/react-timepicker.png?downloads=true)](https://www.npmjs.com/package/react-timepicker)

# react-timepicker
`Timepicker` is a [React](https://facebook.github.io/react/) timepicker component that looks like Android KitKat one.

### Example
[![Timepicker](https://raw.githubusercontent.com/radekmie/react-timepicker/master/timepicker.png)](https://jsfiddle.net/radekm/o7syg3q9/embedded/result/)

### Install
From [npm](https://www.npmjs.com/package/react-timepicker)

```sh
npm install react-timepicker --save
```

### Quick Start
```javascript
'use strict';

import React      from 'react';
import ReactDOM   from 'react-dom';
import Timepicker from 'react-timepicker';

// Remember to include timepicker.css

class TimepickerExample extends React.Component {
    onChange (hours, minutes) {
        // ...
    },

    render () {
        return (
            <Timepicker onChange={this.onChange} />
        );
    }
}

ReactDOM.render(<TimepickerExample />, document.getElementById('timepicker-example'));
```

### Prop Values
#### mode
`React.PropTypes.bool`

Initial mode - `Timepicker.HOURS` or `Timepicker.MINUTES` **(default: `Timepicker.HOURS`)**.

#### size
`React.PropTypes.number`

Clock size in pixels **(default: 300)**.

#### radius
`React.PropTypes.number`

Clock radius in pixels **(default: 125)**.

#### hours
`React.PropTypes.number`

Initial hours **(default: 0)**.

#### minutes
`React.PropTypes.number`

Initial minutes **(default: 0)**.

#### formatNumber
`React.PropTypes.func.isRequired`

Function `(number, 'info' | 'clock') => string` formatting numbers **(default: left pad with 0)**

#### militaryTime
`React.PropTypes.bool`

Military (24-hour) time switch **(default: `true`)**.

#### onChange
`React.PropTypes.func`

Callback function when a hour or a minute is changed. Passes 2 parameters: new hours and minutes.

#### onChangeMode
`React.PropTypes.func`

Callback function when mode is changed. Passes 1 parameter: new mode.
