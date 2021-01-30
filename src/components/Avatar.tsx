import { useSession } from 'next-auth/client';
import { FiUser } from 'react-icons/fi';
import mergeClasses from 'utils/mergeClasses';

interface Props {
  className?: string;
}

const baseClasses = 'w-10 h-10 rounded-full bg-gray-50';

const Avatar: React.FC<Props> = ({ className }) => {
  const [session] = useSession();

  if (session?.user?.image)
    return (
      <span
        style={{
          backgroundImage: `url(${session.user.image})`,
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
