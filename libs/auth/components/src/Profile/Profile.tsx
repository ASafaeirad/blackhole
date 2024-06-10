import { Tag } from '@blackhole/design';

interface Props {
  name: string;
  experience: number;
}

export const Profile = ({ name, experience }: Props) => {
  return (
    <div className="fr gap-4 items-center">
      {name}{' '}
      <Tag className="gap-3">
        <div className="bg-success rounded h-1 w-1" /> <span>{experience}</span>
      </Tag>
    </div>
  );
};
