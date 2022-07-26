import React, {memo} from 'react';

import {SpinnerWrapper} from '../styled/ui-components';

export const Spinner = memo(() => (
  <SpinnerWrapper>
    <span />
    <span />
    <span />
    <span />
  </SpinnerWrapper>
));
