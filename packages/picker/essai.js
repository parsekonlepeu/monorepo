"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContenairDate = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _luxon = require("luxon");
var _hooksTypedRedux = require("../store/hooksTypedRedux");
var _ContextOption = require("../context/ContextOption");
var _pickerSlice = require("../store/pickerSlice");
var _formatMultipleDate = require("../utils/formatMultipleDate");
var _getDateStartRow = require("../utils/getDateStartRow");
var _useLongPress = _interopRequireDefault(require("../hooks/useLongPress"));
var _isInMultipleDate = require("../utils/isInMultipleDate");
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DateContenairCss = {
  mainContenaire: (0, _react2.css)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }),
  subContenair: (0, _react2.css)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20px",
    width: "20px",
    borderRadius: "20px",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none"
  }),
  span: (0, _react2.css)({
    position: "absolute",
    borderRadius: "20px",
    zIndex: 0
  }),
  text: (0, _react2.css)({
    fontWeight: 600,
    zIndex: 100
  })
};
const ContenairDate = _ref => {
  let {
    date,
    refMultipleDate,
    refSelectedDatePicker,
    refFlowSelected
  } = _ref;
  const dispatch = (0, _hooksTypedRedux.usePickerDispatch)();
  const monthPicker = (0, _hooksTypedRedux.usePickerSelector)(state => state.picker.monthPicker);
  const yearPicker = (0, _hooksTypedRedux.usePickerSelector)(state => state.picker.yearPicker);
  const multipleDates = (0, _hooksTypedRedux.usePickerSelector)(state => state.picker.multipleDates);
  const selectedDatePicker = (0, _hooksTypedRedux.usePickerSelector)(state => state.picker.selectedDatePicker);
  const {
    firstDay,
    caseSize,
    canSelectPeriod,
    onChange,
    colors
  } = (0, _react.useContext)(_ContextOption.ContextOption);
  const [isIn, setIsIn] = (0, _react.useState)(false);
  const handleMouseEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsIn(true);
    if (refFlowSelected.current) {
      const selectedDatePickerDt = _luxon.DateTime.fromObject(refSelectedDatePicker.current);
      const diff = date.diff(selectedDatePickerDt, "minutes").toObject().minutes;
      if (diff > 0) {
        dispatch((0, _pickerSlice.changeMultipleDatePicker)({
          newMultipleDates: {
            start: refSelectedDatePicker.current,
            end: date.toObject()
          },
          firstDayWeek: firstDay
        }));
        const ref = (0, _formatMultipleDate.formatMultipleDate)({
          start: refSelectedDatePicker.current,
          end: date.toObject()
        }, firstDay);
        refMultipleDate.current = ref;
      } else if (diff === 0) {
        const multDate = {
          start: date.toObject(),
          end: date.plus({
            days: 1
          }).toObject()
        };
        dispatch((0, _pickerSlice.changeMultipleDatePicker)({
          newMultipleDates: multDate,
          firstDayWeek: firstDay
        }));
        refMultipleDate.current = multDate;
      } else {
        dispatch((0, _pickerSlice.changeMultipleDatePicker)({
          newMultipleDates: {
            start: date.toObject(),
            end: refSelectedDatePicker.current
          },
          firstDayWeek: firstDay
        }));
        const ref = (0, _formatMultipleDate.formatMultipleDate)({
          start: date.toObject(),
          end: refSelectedDatePicker.current
        }, firstDay);
        refMultipleDate.current = ref;
      }
    }
  };
  const handleMouseLeave = (0, _react.useCallback)(() => {
    setIsIn(false);
  }, []);
  const handleClick = (0, _react.useCallback)(() => {
    dispatch((0, _pickerSlice.changeSelectedDatePicker)(date.toObject()));
    dispatch((0, _pickerSlice.changeFlowSelected)(false));
    refFlowSelected.current = false;
    let resetMultipleDate = false;
    if (date.month !== refSelectedDatePicker.current.month || date.year !== refSelectedDatePicker.current.year) {
      dispatch((0, _pickerSlice.changeMonthYearPicker)({
        month: date.month,
        year: date.year
      }));
    }
    if (refMultipleDate.current) {
      const startDt = _luxon.DateTime.fromObject(refMultipleDate.current.start);
      const endDt = _luxon.DateTime.fromObject(refMultipleDate.current.end);
      if (date.day === refSelectedDatePicker.current.day && date.month === refSelectedDatePicker.current.month && date.year === refSelectedDatePicker.current.year) {
        resetMultipleDate = true;
        dispatch((0, _pickerSlice.changeMultipleDatePicker)({
          newMultipleDates: null,
          firstDayWeek: firstDay
        }));
        refSelectedDatePicker.current = date.toObject();
        refMultipleDate.current = null;
      } else {
        const diff = Math.floor(endDt.diff(startDt, "days").toObject().days);
        if (diff <= 7) {
          const newMultipleDates = {
            start: date.toObject(),
            end: date.plus({
              days: diff
            }).toObject()
          };
          dispatch((0, _pickerSlice.changeMultipleDatePicker)({
            newMultipleDates: newMultipleDates,
            firstDayWeek: firstDay
          }));
          refSelectedDatePicker.current = date.toObject();
          refMultipleDate.current = newMultipleDates;
        } else if (diff > 7 && diff <= 28) {
          const start = _luxon.DateTime.fromObject(refMultipleDate.current.start);
          const end = _luxon.DateTime.fromObject(refMultipleDate.current.end);
          const diff = end.diff(start, "days").toObject().days;
          const newStart = (0, _getDateStartRow.getDateStartRow)(date, firstDay);
          const newMultipleDates = {
            start: newStart.toObject(),
            end: newStart.plus({
              days: diff
            }).toObject()
          };
          dispatch((0, _pickerSlice.changeMultipleDatePicker)({
            newMultipleDates: newMultipleDates,
            firstDayWeek: firstDay
          }));
          refSelectedDatePicker.current = newStart.toObject();
          refMultipleDate.current = newMultipleDates;
        }
      }
    } else {
      dispatch((0, _pickerSlice.changeMultipleDatePicker)({
        newMultipleDates: null,
        firstDayWeek: firstDay
      }));
      refSelectedDatePicker.current = date.toObject();
      refMultipleDate.current = null;
    }
    onChange({
      multipleDate: refMultipleDate.current,
      selectedDate: refSelectedDatePicker.current,
      resetMultipleDate: resetMultipleDate
    });
  }, [date, refSelectedDatePicker.current, refMultipleDate.current, firstDay]);
  const handleLongPress = () => {
    dispatch((0, _pickerSlice.changeFlowSelected)(true));
    refFlowSelected.current = true;
    dispatch((0, _pickerSlice.changeSelectedDatePicker)(date.toObject()));
    refSelectedDatePicker.current = date.toObject();
  };
  const handleQuitLongPress = () => {
    dispatch((0, _pickerSlice.changeSelectedDatePicker)(date.toObject()));
    refSelectedDatePicker.current = date.toObject();
    dispatch((0, _pickerSlice.changeMultipleDatePicker)({
      newMultipleDates: refMultipleDate.current,
      firstDayWeek: firstDay
    }));
    dispatch((0, _pickerSlice.changeFlowSelected)(false));
    refFlowSelected.current = false;
    onChange({
      multipleDate: refMultipleDate.current,
      selectedDate: refSelectedDatePicker.current,
      resetMultipleDate: false
    });
  };
  let longPress;
  canSelectPeriod ? longPress = (0, _useLongPress.default)(handleLongPress, handleClick, handleQuitLongPress, 500) : longPress = {
    onMouseDown: handleClick
  };
  const isToday = _luxon.DateTime.now().day === date.day && _luxon.DateTime.now().month === date.month && _luxon.DateTime.now().year === date.year;
  const isDateSelected = selectedDatePicker.day === date.day && selectedDatePicker.month === date.month && selectedDatePicker.year === date.year;
  const isInCurrentMonth = date.month === monthPicker && date.year === yearPicker;
  return /*#__PURE__*/React.createElement("div", _extends({
    css: DateContenairCss.mainContenaire,
    style: {
      width: caseSize + "px",
      height: caseSize + "px"
    }
  }, longPress, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }), /*#__PURE__*/React.createElement("div", {
    css: DateContenairCss.subContenair,
    style: {
      backgroundColor: isToday ? colors.currentDay : isDateSelected && !multipleDates ? colors.selectedDay : "transparent",
      width: caseSize - 5 + "px",
      height: caseSize - 5 + "px"
    }
  }, isIn && !isDateSelected && !isToday ? /*#__PURE__*/React.createElement("span", {
    css: DateContenairCss.span,
    style: {
      width: caseSize - 5 + "px",
      height: caseSize - 5 + "px",
      backgroundColor: multipleDates && (0, _isInMultipleDate.isInMultipleDate)(multipleDates, date) ? colors.selectedDay : "white"
    }
  }) : null, /*#__PURE__*/React.createElement("p", {
    css: DateContenairCss.text,
    style: {
      color: isToday ? colors.textCurrentDay : isDateSelected || multipleDates && (0, _isInMultipleDate.isInMultipleDate)(multipleDates, date) ? colors.textSelectedDay : isInCurrentMonth ? colors.textBase : colors.textDisableDay,
      fontSize: (caseSize - 5) / 2.5 + "px"
    }
  }, date.day)));
};
exports.ContenairDate = ContenairDate;
