import { List } from '@blackhole/design';
import { FocusScope } from 'react-aria';

export const Values = () => {
  const values = [
    { id: 1, name: 'Value 1' },
    { id: 2, name: 'Value 2' },
    { id: 3, name: 'Value 3' },
  ];

  return (
    <List
      items={values}
      renderItem={({ item }) => item.name}
      getKey={item => item.id}
    />
  );
};

export const ValuesPage = () => {
  return (
    <FocusScope contain restoreFocus autoFocus>
      <Values />
    </FocusScope>
  );
};
