import fmtEvent from '../_util/fmtEvent';

Component({
  props: {
    type: 'number',
    className: '',
    focus: false,
    placeholder: '',
    value: '',
    controlled: false,
    showClear: false,
    focusAfterClear: true,
  },
  data: {
    _focus: false,
    _unit: '',
  },
  didMount() {
    this.getMoneyUnit(this.props.value);
    this.setData({
      _focus: this.props.focus,
    });
  },
  didUpdate(prevProps) {
    const { focus: prevFocus } = prevProps;
    const { focus: nowFocus } = this.props;
    if (prevFocus !== nowFocus) {
      this.setData({
        _focus: nowFocus,
      });
    }
    this.getMoneyUnit(this.props.value);
  },
  methods: {
    onInput(e) {
      const event = fmtEvent(this.props, e);
      if (this.props.onInput) {
        this.props.onInput(event);
      }
      this.getMoneyUnit(e.detail.value);
    },
    onConfirm(e) {
      const event = fmtEvent(this.props, e);
      if (this.props.onConfirm) {
        this.props.onConfirm(event);
      }
    },
    onButtonClick() {
      if (this.onButtonClick) {
        this.props.onButtonClick();
      }
    },
    onFocus(e) {
      this.setData({
        _focus: true,
      });
      const event = fmtEvent(this.props, e);
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
      this.getMoneyUnit(e.detail.value);
    },
    onBlur(e) {
      this.setData({
        _focus: false,
      });
      const event = fmtEvent(this.props, e);
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
      this.getMoneyUnit(e.detail.value);
    },
    onClearTap() {
      if (this.props.focusAfterClear) {
        this.setData({
          _focus: true,
        });
      }
      if (this.props.onClear) {
        this.props.onClear();
      }
    },
    getMoneyUnit(inputValue) {
      const value = Math.floor(inputValue);
      if (value > 999.99 && value <= 10000) {
        this.setData({
          _unit: '千',
        });
      } else if (value > 9999.99 && value <= 100000) {
        this.setData({
          _unit: '万',
        });
      } else if (value > 99999.99 && value <= 1000000) {
        this.setData({
          _unit: '十万',
        });
      } else if (value > 999999.99 && value <= 10000000) {
        this.setData({
          _unit: '百万',
        });
      } else if (value > 9999999.99 && value <= 100000000) {
        this.setData({
          _unit: '千万',
        });
      } else if (value > 99999999.99 && value <= 1000000000) {
        this.setData({
          _unit: '亿',
        });
      } else if (value > 999999999.99 && value <= 10000000000) {
        this.setData({
          _unit: '十亿',
        });
      } else {
        this.setData({
          _unit: '',
        });
      }
    },
  },
});
