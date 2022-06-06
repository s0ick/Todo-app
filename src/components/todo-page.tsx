import React, {useCallback, useMemo, useState} from 'react';
import {ThemeProvider} from 'styled-components';

import {IconThemeMode} from '../common/ui-components/icons';
import {Themes} from '../common/styled/color-constants';
import {GlobalStyles} from '../common/global-styled';
import {SUBTITLE, TITLE} from '../utils/content-constants';
import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  PageContent,
  PageTheme
} from '../common/styled/ui-components';


export function TodoPage() {
  const [isLightMode, setIsLightMode] = useState(true);

  const _toggleMode = useCallback(
    (): void => {
      setIsLightMode(prevState => !prevState);
    }, []
  );

  const theme = useMemo(
    () => {
      return isLightMode ? 'light' : 'dark';
    }, [isLightMode]
  );

  return (
    <ThemeProvider theme={Themes[theme]}>
      <GlobalStyles/>

      <PageWrapper>
        <PageTitle>{TITLE}</PageTitle>
        <PageSubtitle>{SUBTITLE}</PageSubtitle>

        <PageTheme onClick={_toggleMode}>
          <IconThemeMode/>
        </PageTheme>

        <PageContent></PageContent>

      </PageWrapper>
    </ThemeProvider>
  );
}
