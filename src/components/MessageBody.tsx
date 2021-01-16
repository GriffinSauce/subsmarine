import { gmail_v1 } from 'googleapis';
import { getBodyHTML } from 'utils/message';
import styles from 'components/Message.module.css';

interface Props {
  message: gmail_v1.Schema$Message;
}

const MessageBody: React.FC<Props> = ({ message }) => {
  return (
    <div
      className={styles.message}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: getBodyHTML(message) }}
    />
  );
};

export default MessageBody;
