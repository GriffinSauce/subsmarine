import { useUser } from '@auth0/nextjs-auth0';
import { FiUser } from 'react-icons/fi';
import tailshake from 'tailshake';

interface Props {
  className?: string;
}

const Avatar: React.FC<Props> = ({ className }) => {
  const { user } = useUser();

  return (
    <div
      className={tailshake(
        'relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 overflow-hidden',
        className,
      )}
    >
      <FiUser />
      {user?.picture ? (
        <div
          style={{
            backgroundImage: `url(${user.picture})`,
          }}
          className="absolute inset-0 bg-cover"
        />
      ) : null}
    </div>
  );
};

export default Avatar;
