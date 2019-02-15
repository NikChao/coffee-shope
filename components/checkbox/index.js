import React, { useState } from 'react';
import styles from './styles.scss';

import Check from './check.svg';

function Checkbox ({ label, onChange }) {
  const [check, setCheck] = useState(false);

  function toggle () {
    const newCheck = !check
    setCheck(newCheck);

    if (typeof onChange === 'function') {
      const syntheticEvent = {
        target: { value: newCheck }
      };
      onChange(syntheticEvent)
    }
  }

  const optionLabelMarker = [
    styles.optionLabelMarker,
    styles.block,
    check && styles.filledCheckContainer
  ].join(' ');

  return (
      <span onClick={toggle} className={styles.container}>
        <span className={styles.flexShrinkNone}>
          <span className={optionLabelMarker}>
            {check && (
              <Check className={styles.checkboxWrapper} />
            )}
          </span>
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </span>
  );
}

export { Checkbox };