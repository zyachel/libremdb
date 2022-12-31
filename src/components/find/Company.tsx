import { Companies } from '../../interfaces/shared/search';
import Link from 'next/link';

import styles from '../../styles/modules/components/find/company.module.scss';

type Props = {
  company: Companies[0];
};

const Company = ({ company }: Props) => {
  return (
    <li className={styles.company}>
      <Link href={`name/${company.id}`}>
        <a className={`heading ${styles.heading}`}>{company.name}</a>
      </Link>
      {company.country && <p>{company.country}</p>}
      {!!company.type && <p>{company.type}</p>}
    </li>
  );
};

export default Company;
