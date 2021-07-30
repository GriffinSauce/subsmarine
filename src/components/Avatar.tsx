import { useUser } from '@auth0/nextjs-auth0';
import { FiUser } from 'react-icons/fi';
import mergeClasses from 'utils/mergeClasses';

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
        className={mergeClasses(baseClasses, 'bg-cover', className)}
      />
    );

  return (
    <div
      className={mergeClasses(
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
