import styles from "./Message.module.css";
import { getSubject, getBodyHTML } from "../utils/message";

const Message = ({ message }) => {
  return (
    <>
      <h2>{getSubject(message)}</h2>
      <div
        className={styles.message}
        dangerouslySetInnerHTML={{ __html: getBodyHTML(message) }}
      />
    </>
  );
};

export default Message;
