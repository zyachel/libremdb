import { formatTime } from 'src/utils/helpers';
import { CardResult } from 'src/components/card';
import { Titles } from 'src/interfaces/shared/search';
import styles from 'src/styles/modules/components/find/title.module.scss';

type Props = { title: Titles[number] };

const Title = ({ title }: Props) => {
  return (
    <CardResult showImage name={title.name} link={`/title/${title.id}`} image={title.image?.url}>
      <ul aria-label='quick facts' className={styles.basicInfo}>
        <li>{title.type}</li>
        {title.runtime && (
          <li>{formatTime(title.runtime)}</li>
        )}
        <li>{title.releaseYear}</li>
      </ul>
      {title.plot && (
        <p className={styles.plot} dangerouslySetInnerHTML={{__html: title.plot}}></p>
      )}
    </CardResult>
  );
};

export default Title;
