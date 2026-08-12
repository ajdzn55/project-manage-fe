interface Props {
  members: string[];
  additionalCount?: number;
}

const MemberAvatars = ({ members, additionalCount = 0 }: Props) => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {members.map((member, index) => (
          <span
            key={`${member}-${index}`}
            className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-700 text-xs font-semibold text-white"
          >
            {member}
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
