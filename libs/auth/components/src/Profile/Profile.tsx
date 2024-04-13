interface Props {
  name: string;
}

export const Profile = ({ name }: Props) => {
  return <div>{name}</div>;
};
