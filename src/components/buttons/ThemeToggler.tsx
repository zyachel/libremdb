import { useContext } from 'react';
import { themeContext } from '../../context/theme-context';

import styles from '../../styles/modules/components/buttons/themeToggler.module.scss';

type Props = {
  className: string;
};

const ThemeToggler = (props: Props) => {
  const { theme, setTheme } = useContext(themeContext);
  const clickHandler = () => {
    const themeToSet = theme === 'light' ? 'dark' : 'light';
    setTheme(themeToSet);
  };

  return (
    <button
      className={`${styles.button}  ${props.className}`}
      aria-label='Change theme'
      onClick={clickHandler}
    >
      <svg
        className={`icon ${styles.icon}`}
        focusable='false'
        aria-hidden='true'
        role='img'
      >
        <use href='/svg/sprite.svg#icon-theme-switcher'></use>
      </svg>
    </button>
  );
};

export default ThemeToggler;
