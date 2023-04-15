import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import styles from 'src/styles/modules/components/card/card.module.scss';

// ensuring that other attributes to <Card/> are correct based on the value of 'as' prop.
// a cheap implementation of as prop found in libraries like CharkaUI or MaterialUI.
type Props<T extends ElementType> = {
  children: ReactNode;
  as?: T | 'section';
  hoverable?: true;
} & ComponentPropsWithoutRef<T>;

const Card = <T extends ElementType = 'li'>({
  children,
  as,
  hoverable,
  className,
  ...rest
}: Props<T>) => {
  const Component = as ?? 'li';
  const classNames = `${hoverable ? styles.hoverable : ''} ${styles.card} ${className}`;

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
};

export default Card;
