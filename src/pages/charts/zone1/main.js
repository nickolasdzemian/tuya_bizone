import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ChartTemp1 from './temp';
import ChartTime1 from './timer';
import dpCodes from '../../../config/dpCodes.ts';

const { ModeChannel: ModeChannelCode } = dpCodes;

class EnteringToHell extends PureComponent {
  render() {
    const modeZ = this.props.ModeChannel.substring(0, 2);
    return modeZ === '01' ? <ChartTemp1 /> : modeZ === '02' ? <ChartTime1 /> : null;
  }
}

EnteringToHell.propTypes = {
  ModeChannel: PropTypes.string,
};

EnteringToHell.defaultProps = {
  ModeChannel: '000000',
};

export default connect(({ dpState }) => ({
  ModeChannel: dpState[ModeChannelCode],
}))(EnteringToHell);
