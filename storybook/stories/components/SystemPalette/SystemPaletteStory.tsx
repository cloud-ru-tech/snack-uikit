import { Divider } from '@snack-uikit/divider';
import { Tabs } from '@snack-uikit/tabs';

import { capitalize } from '../utils';
import { TABS } from './constants';
import styles from './styles.module.scss';

export function SystemPaletteStory() {
  return (
    <>
      <Tabs defaultValue={TABS[0].sysPalette}>
        <Tabs.TabBar>
          {TABS.map(({ sysPalette }) => (
            <Tabs.Tab key={sysPalette} value={sysPalette} label={capitalize(sysPalette)} />
          ))}
        </Tabs.TabBar>
        <Divider className={styles.divider} />
        {TABS.map(({ sysPalette, content }) => (
          <Tabs.TabContent key={sysPalette} value={sysPalette}>
            {content}
          </Tabs.TabContent>
        ))}
      </Tabs>
    </>
  );
}
