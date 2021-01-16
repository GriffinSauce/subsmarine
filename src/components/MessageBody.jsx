import { getBodyHTML } from 'utils/message';
import styles from './Message.module.css';

const MessageBody = ({ message }) => {
  return (
    <div
      className={styles.message}
      dangerouslySetInnerHTML={{ __html: getBodyHTML(message) }}
    />
  );
};

export default MessageBody;
