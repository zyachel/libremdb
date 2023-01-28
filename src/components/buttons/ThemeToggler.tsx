import { useContext } from 'react';
import { themeContext } from 'src/context/theme-context';
import styles from 'src/styles/modules/components/buttons/themeToggler.module.scss';

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
      onClick={clickHandler}
    >
      <span className='visually-hidden'>Change theme</span>
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
