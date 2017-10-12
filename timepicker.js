"use strict"
var _createClass = (function() {
    function a(b, c) {
      for (var e, d = 0; d < c.length; d++)
        (e = c[d]),
          (e.enumerable = e.enumerable || !1),
          (e.configurable = !0),
          "value" in e && (e.writable = !0),
          Object.defineProperty(b, e.key, e)
    }
    return function(b, c, d) {
      return c && a(b.prototype, c), d && a(b, d), b
    }
  })(),
  _propTypes = require("prop-types"),
  _propTypes2 = _interopRequireDefault(_propTypes),
  _react = require("react"),
  _react2 = _interopRequireDefault(_react)
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Clock = exports.Info = exports.Timepicker = void 0)
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a }
}
function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(a, b) {
  if (!a)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  return b && ("object" == typeof b || "function" == typeof b) ? b : a
}
function _inherits(a, b) {
  if ("function" != typeof b && null !== b)
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof b
    )
  ;(a.prototype = Object.create(b && b.prototype, {
    constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 }
  })),
    b &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : (a.__proto__ = b))
}
var Timepicker = (exports.Timepicker = (function(a) {
  function b(_ref) {
    var c = _ref.hours,
      d = _ref.minutes,
      e = _ref.mode
    _classCallCheck(this, b)
    var f = _possibleConstructorReturn(
      this,
      (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments)
    )
    return (
      (f.state = { hours: c, minutes: d, mode: e }),
      (f.onChange = f.onChange.bind(f)),
      (f.onChangeMode = f.onChangeMode.bind(f)),
      f
    )
  }
  return (
    _inherits(b, a),
    _createClass(b, [
      {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(_ref2) {
          var c = _ref2.hours,
            d = _ref2.minutes,
            e = _ref2.mode,
            f = {},
            g = this.props
          g.hours !== c && (f.hours = c),
            g.minutes !== d && (f.minutes = d),
            g.mode !== e && (f.mode = e),
            this.setState(f)
        }
      },
      {
        key: "render",
        value: function render() {
          var _state = this.state,
            c = _state.hours,
            d = _state.minutes,
            e = _state.mode,
            _props = this.props,
            f = _props.formatNumber,
            g = _props.militaryTime,
            h = _props.radius,
            j = _props.size
          return _react2.default.createElement(
            "div",
            { className: "timepicker" },
            _react2.default.createElement(b.Info, {
              formatNumber: f,
              hours: c,
              minutes: d,
              mode: e,
              onChangeMode: this.onChangeMode,
              size: j
            }),
            _react2.default.createElement(b.Clock, {
              hours: c,
              minutes: d,
              mode: e,
              size: j,
              formatNumber: f,
              onChangeMode: this.onChangeMode,
              militaryTime: g,
              radius: h,
              onChange: this.onChange
            })
          )
        }
      },
      {
        key: "onChange",
        value: function onChange(c, d) {
          this.setState({ hours: c, minutes: d }),
            this.props.onChange && this.props.onChange(c, d)
        }
      },
      {
        key: "onChangeMode",
        value: function onChangeMode(c) {
          this.setState({ mode: c }),
            this.props.onChangeMode && this.props.onChangeMode(c)
        }
      }
    ]),
    b
  )
})(_react2.default.Component))
;(Timepicker.HOURS = !0),
  (Timepicker.MINUTES = !1),
  (Timepicker.propTypes = {
    formatNumber: _propTypes2.default.func,
    hours: _propTypes2.default.number,
    militaryTime: _propTypes2.default.bool,
    minutes: _propTypes2.default.number,
    mode: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onChangeMode: _propTypes2.default.func,
    radius: _propTypes2.default.number,
    size: _propTypes2.default.number
  }),
  (Timepicker.defaultProps = {
    formatNumber: function formatNumber(a) {
      return 10 > a ? "0" + a : a
    },
    hours: 0,
    militaryTime: !0,
    minutes: 0,
    mode: Timepicker.HOURS,
    radius: 125,
    size: 300
  })
var Info = (exports.Info = (function(a) {
  function b() {
    _classCallCheck(this, b)
    var c = _possibleConstructorReturn(
      this,
      (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments)
    )
    return (
      (c.onClickHours = c.onClickHours.bind(c)),
      (c.onClickMinutes = c.onClickMinutes.bind(c)),
      c
    )
  }
  return (
    _inherits(b, a),
    _createClass(b, [
      {
        key: "render",
        value: function render() {
          var _props2 = this.props,
            c = _props2.formatNumber,
            d = _props2.hours,
            e = _props2.minutes,
            f = _props2.mode,
            g = _props2.size
          return _react2.default.createElement(
            "p",
            { className: "timepicker-info", style: { width: g } },
            _react2.default.createElement(
              "span",
              {
                className:
                  "timepicker-info-digits" +
                  (f === Timepicker.HOURS ? " active" : ""),
                onClick: this.onClickHours
              },
              c(d, "info")
            ),
            ":",
            _react2.default.createElement(
              "span",
              {
                className:
                  "timepicker-info-digits" +
                  (f === Timepicker.MINUTES ? " active" : ""),
                onClick: this.onClickMinutes
              },
              c(e, "info")
            )
          )
        }
      },
      {
        key: "onClickHours",
        value: function onClickHours() {
          this.props.onChangeMode && this.props.onChangeMode(Timepicker.HOURS)
        }
      },
      {
        key: "onClickMinutes",
        value: function onClickMinutes() {
          this.props.onChangeMode && this.props.onChangeMode(Timepicker.MINUTES)
        }
      }
    ]),
    b
  )
})(_react2.default.Component))
;(Info.propTypes = {
  formatNumber: _propTypes2.default.func.isRequired,
  hours: _propTypes2.default.number.isRequired,
  minutes: _propTypes2.default.number.isRequired,
  mode: _propTypes2.default.bool.isRequired,
  onChangeMode: _propTypes2.default.func,
  size: _propTypes2.default.number.isRequired
}),
  (Timepicker.Info = Info)
var Clock = (exports.Clock = (function(a) {
  function b(_ref3) {
    var c = _ref3.hours,
      d = _ref3.militaryTime,
      e = _ref3.minutes,
      f = _ref3.mode
    _classCallCheck(this, b)
    var g = _possibleConstructorReturn(
      this,
      (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments)
    )
    return (
      (g.hand1 = null),
      (g.hand2 = null),
      (g.state = {
        even: !0,
        hours: c % (d ? 24 : 12),
        minutes: e % 60,
        mode: f,
        positionsHours: g.calculatePositionsHours(),
        positionsMinutes: g.calculatePositionsMinutes()
      }),
      g
    )
  }
  return (
    _inherits(b, a),
    _createClass(b, [
      {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(_ref4) {
          var c = _ref4.hours,
            d = _ref4.militaryTime,
            e = _ref4.minutes,
            f = _ref4.mode,
            g = _ref4.radius,
            h = _ref4.size,
            j = this.props
          h !== j.size || g !== j.radius
            ? this.setState({
                positionsHours: this.calculatePositionsHours(),
                positionsMinutes: this.calculatePositionsMinutes()
              })
            : d !== j.militaryTime &&
              this.setState({ positionsHours: this.calculatePositionsHours() }),
            f !== j.mode && this.setState({ mode: f }),
            c !== j.hours && this.setState({ hours: c % (d ? 24 : 12) }),
            e !== j.minutes && this.setState({ minutes: e % 60 })
        }
      },
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.componentDidUpdate({})
        }
      },
      {
        key: "componentDidUpdate",
        value: function componentDidUpdate(c, d) {
          var _props3 = this.props,
            e = _props3.militaryTime,
            f = _props3.mode,
            g = _props3.size,
            _state2 = this.state,
            h = _state2.even,
            j = _state2.hours,
            k = _state2.minutes,
            l = _state2.positionsHours,
            m = _state2.positionsMinutes
          if (
            (c.mode !== f || d.hours !== j || d.minutes !== k) &&
            this.hand1 &&
            this.hand2
          ) {
            var n = h ? this.hand1 : this.hand2,
              o = h ? this.hand2 : this.hand1
            n.setAttribute(
              "x2",
              f ? l[0 === j ? (e ? 23 : 11) : j - 1][0] : m[k][0]
            ),
              n.setAttribute(
                "y2",
                f ? l[0 === j ? (e ? 23 : 11) : j - 1][1] : m[k][1]
              ),
              c.mode !== f &&
                (o.setAttribute("x2", g / 2), o.setAttribute("y2", g / 2))
            var p = n.getAttribute("x1") - n.getAttribute("x2"),
              q = n.getAttribute("y1") - n.getAttribute("y2"),
              r = o.getAttribute("x1") - o.getAttribute("x2"),
              s = o.getAttribute("y1") - o.getAttribute("y2"),
              t = Math.ceil(Math.sqrt(p * p + q * q)),
              u = Math.ceil(Math.sqrt(r * r + s * s))
            ;(n.style.strokeDasharray = t),
              (o.style.strokeDasharray = u),
              (n.style.strokeDashoffset = t),
              (n.style.transitionProperty = "none"),
              (o.style.transitionProperty = "none"),
              n.getBoundingClientRect(),
              o.getBoundingClientRect(),
              (n.style.transitionProperty = "stroke-dashoffset"),
              (o.style.transitionProperty = "stroke-dashoffset"),
              (n.style.strokeDashoffset = "0"),
              (o.style.strokeDashoffset = u)
          }
        }
      },
      {
        key: "render",
        value: function render() {
          var e = this,
            c = this.props.size,
            d = this.state.mode
          return _react2.default.createElement(
            "svg",
            { height: c, width: c, ref: "foo" },
            _react2.default.createElement("line", {
              ref: function ref(f) {
                return (e.hand1 = f)
              },
              className: "timepicker-hand",
              x1: c / 2,
              y1: c / 2,
              x2: c / 2,
              y2: c / 2
            }),
            _react2.default.createElement("line", {
              ref: function ref(f) {
                return (e.hand2 = f)
              },
              className: "timepicker-hand",
              x1: c / 2,
              y1: c / 2,
              x2: c / 2,
              y2: c / 2
            }),
            _react2.default.createElement(
              "g",
              { className: "timepicker-" + (d ? "visible" : "invisible") },
              this.renderHoursBubbles()
            ),
            _react2.default.createElement(
              "g",
              { className: "timepicker-" + (d ? "invisible" : "visible") },
              this.renderMinutesBubbles()
            )
          )
        }
      },
      {
        key: "renderHoursBubbles",
        value: function renderHoursBubbles() {
          for (
            var c = this.props.formatNumber,
              _state3 = this.state,
              d = _state3.hours,
              e = _state3.positionsHours,
              f = [],
              g = 0;
            g < e.length;
            ++g
          ) {
            var h = e[g][0],
              j = e[g][1],
              k = (g + 1) % 24,
              l = this.onClickHour(k),
              m = this.onMouseMoveHour(k)
            f.push(
              _react2.default.createElement(
                "g",
                {
                  className: "timepicker-bubble" + (d === k ? " active" : ""),
                  key: g,
                  onClick: l,
                  onMouseMove: m,
                  onMouseUp: m
                },
                _react2.default.createElement("circle", {
                  cx: h,
                  cy: j,
                  r: 15
                }),
                _react2.default.createElement(
                  "text",
                  { x: h, y: j },
                  c(k, "clock")
                )
              )
            )
          }
          return f
        }
      },
      {
        key: "renderMinutesBubbles",
        value: function renderMinutesBubbles() {
          for (
            var c = this.props.formatNumber,
              _state4 = this.state,
              d = _state4.minutes,
              e = _state4.positionsMinutes,
              f = [],
              g = 0;
            g < e.length;
            ++g
          ) {
            var h = e[g][0],
              j = e[g][1],
              k = this.onClickMinute(g),
              l = this.onMouseMoveMinute(g)
            f.push(
              _react2.default.createElement(
                "g",
                {
                  className:
                    "timepicker-bubble" +
                    (g % 5 ? " small" : "") +
                    (d === g ? " active" : ""),
                  key: g,
                  onClick: k,
                  onMouseMove: l
                },
                _react2.default.createElement("circle", {
                  cx: h,
                  cy: j,
                  r: g % 5 ? (d === g ? 5 : 0) : 15
                }),
                g % 5
                  ? _react2.default.createElement("circle", {
                      cx: h,
                      cy: j,
                      r: 10
                    })
                  : _react2.default.createElement(
                      "text",
                      { x: h, y: j },
                      c(g, "clock")
                    )
              )
            )
          }
          return f
        }
      },
      {
        key: "onChange",
        value: function onChange() {
          this.props.onChange &&
            this.props.onChange(this.state.hours, this.state.minutes),
            this.props.onChangeMode && this.props.onChangeMode(this.state.mode)
        }
      },
      {
        key: "onClickHour",
        value: function onClickHour(c) {
          var d = this
          return function(e, f) {
            ;(d.state.hours === c && f) ||
              d.setState(
                {
                  even: !d.state.even,
                  hours: c,
                  mode: f
                    ? d.state.mode === Timepicker.HOURS
                      ? Timepicker.HOURS
                      : Timepicker.MINUTES
                    : d.state.mode === Timepicker.HOURS
                      ? Timepicker.MINUTES
                      : Timepicker.HOURS
                },
                function() {
                  return d.onChange()
                }
              )
          }
        }
      },
      {
        key: "onClickMinute",
        value: function onClickMinute(c) {
          var d = this
          return function() {
            d.state.minutes === c ||
              d.setState({ minutes: c, even: !d.state.even }, function() {
                return d.onChange()
              })
          }
        }
      },
      {
        key: "onMouseMoveHour",
        value: function onMouseMoveHour(c) {
          var d = this.onClickHour(c)
          return function(e) {
            var f = "mouseup" === e.type
            ;(f || 1 === e.buttons) && d(e, !f)
          }
        }
      },
      {
        key: "onMouseMoveMinute",
        value: function onMouseMoveMinute(c) {
          var d = this.onClickMinute(c)
          return function(e) {
            1 === e.buttons && d()
          }
        }
      },
      {
        key: "calculatePositionsHours",
        value: function calculatePositionsHours() {
          for (
            var _props4 = this.props,
              c = _props4.militaryTime,
              d = _props4.radius,
              e = _props4.size,
              f = [],
              g = 1;
            g <= (c ? 24 : 12);
            ++g
          )
            f.push([
              Math.round(
                e / 2 +
                  d *
                    (c ? (12 < g ? 1 : 0.65) : 1) *
                    Math.cos(((g % 12) / 6 - 0.5) * Math.PI)
              ),
              Math.round(
                e / 2 +
                  d *
                    (c ? (12 < g ? 1 : 0.65) : 1) *
                    Math.sin(((g % 12) / 6 - 0.5) * Math.PI)
              )
            ])
          return f
        }
      },
      {
        key: "calculatePositionsMinutes",
        value: function calculatePositionsMinutes() {
          for (
            var _props5 = this.props,
              c = _props5.radius,
              d = _props5.size,
              e = [],
              f = 0;
            60 > f;
            ++f
          )
            e.push([
              Math.round(d / 2 + c * Math.cos((f / 30 - 0.5) * Math.PI)),
              Math.round(d / 2 + c * Math.sin((f / 30 - 0.5) * Math.PI))
            ])
          return e
        }
      }
    ]),
    b
  )
})(_react2.default.Component))
;(Clock.propTypes = {
  formatNumber: _propTypes2.default.func.isRequired,
  hours: _propTypes2.default.number.isRequired,
  militaryTime: _propTypes2.default.bool.isRequired,
  minutes: _propTypes2.default.number.isRequired,
  mode: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func,
  onChangeMode: _propTypes2.default.func,
  radius: _propTypes2.default.number.isRequired,
  size: _propTypes2.default.number.isRequired
}),
  (Timepicker.Clock = Clock)
