import { useUser } from '@auth0/nextjs-auth0';
import { FiUser } from 'react-icons/fi';
import tailshake from 'tailshake';

interface Props {
  className?: string;
}

const baseClasses = 'w-10 h-10 rounded-full bg-gray-50';

const Avatar: React.FC<Props> = ({ className }) => {
  const { user } = useUser();

  if (user?.picture)
    return (
      <span
        style={{
          backgroundImage: `url(${user.picture})`,
        }}
        className={tailshake(baseClasses, 'bg-cover', className)}
      />
    );

  return (
    <div
      className={tailshake(
        baseClasses,
        'flex items-center justify-center',
        className,
      )}
    >
      <FiUser />
    </div>
  );
};

export default Avatar;
