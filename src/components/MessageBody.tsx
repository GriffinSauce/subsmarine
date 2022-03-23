import { Email } from 'mailslurp-client';
import { useTheme } from 'next-themes';
import { Interweave, FilterInterface } from 'interweave';
import styles from './MessageBody.module.css';

interface Props {
  message: Email;
}

const linkFilter: FilterInterface = {
  node(name, node) {
    if (name === 'a') {
      node.setAttribute('target', '_blank');
    }
    return node;
  },
};

const MessageBody: React.FC<Props> = ({ message }) => {
  const { resolvedTheme } = useTheme();

  const darkModeLayer =
    resolvedTheme === 'dark'
      ? `<div class="${styles.darkModeLayer}"></div>`
      : '';
  const contentLayer = `<div class="${styles.message}">${message.body}</div>`;
  const content = `${darkModeLayer}${contentLayer}`;

  return (
    <div className="relative">
      <Interweave content={content} filters={[linkFilter]} />
    </div>
  );
};

export default MessageBody;
