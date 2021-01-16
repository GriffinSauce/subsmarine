import styles from "./Message.module.css";
import { getBodyHTML } from "../utils/message";

const MessageBody = ({ message }) => {
  return (
    <div
      className={styles.message}
      dangerouslySetInnerHTML={{ __html: getBodyHTML(message) }}
    />
  );
};

export default MessageBody;
