import { Email } from 'mailslurp-client';
import { useTheme } from 'next-themes';
import { getBodyHTML } from 'utils/message';
import styles from './MessageBody.module.css';

interface Props {
  message: Email;
}

const MessageBody: React.FC<Props> = ({ message }) => {
  const { resolvedTheme } = useTheme();

  const darkModeLayer =
    resolvedTheme === 'dark'
      ? `<div class="${styles.darkModeLayer}"></div>`
      : '';
  const content = `${darkModeLayer}${getBodyHTML(message)}`;

  return (
    <div className="relative">
      <div
        className={styles.message}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default MessageBody;
