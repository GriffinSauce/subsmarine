import Link from "next/link";
import { getSubject } from "../utils/message";

const MessageListItem = ({ message }) => {
  return (
    <Link href={`/stack/${message.id}`}>
      <a>
        <h2>{getSubject(message)}</h2>
        <p>{message.snippet}</p>
      </a>
    </Link>
  );
};

export default MessageListItem;
