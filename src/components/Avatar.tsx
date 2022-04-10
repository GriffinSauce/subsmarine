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
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-50',
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
