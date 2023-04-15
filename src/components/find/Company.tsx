import { CardResult } from 'src/components/card';
import { Companies } from 'src/interfaces/shared/search';

type Props = { company: Companies[number] };

const Company = ({ company }: Props) => (
  <CardResult name={company.name} link={`/search/title?companies=${company.id}`}>
    {company.country && <p>{company.country}</p>}
    {!!company.type && <p>{company.type}</p>}
  </CardResult>
);

export default Company;
