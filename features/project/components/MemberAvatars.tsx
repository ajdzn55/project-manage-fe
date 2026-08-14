import { User } from '@/features/user/types/user.type';

interface Props {
  members: Pick<User, 'id' | 'name'>[];
  additionalCount?: number;
}

const avatarColors = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-violet-600',
  'bg-purple-600',
  'bg-fuchsia-600',
  'bg-pink-600',
  'bg-rose-600',
  'bg-red-600',
  'bg-orange-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-lime-700',
  'bg-green-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-sky-600',
] as const;

const getAvatarColor = (memberId: string) => {
  const hash = Array.from(memberId).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) | 0,
    0,
  );

  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const MemberAvatars = ({ members, additionalCount = 0 }: Props) => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {members.map((member) => (
          <span
            key={member.id}
            title={member.name}
            className={`flex size-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white ${getAvatarColor(member.id)}`}
          >
            {member.name}
          </span>
        ))}
      </div>
      {additionalCount > 0 && (
        <span className="ml-2 text-xs text-slate-500">+{additionalCount}</span>
      )}
    </div>
  );
};

export default MemberAvatars;
