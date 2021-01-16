import Link from "next/link";

const getSubject = (message) =>
  message.payload.headers.find((header) => header.name === "Subject").value;

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
