export type OptionType = {
  value: string;
  label: string;
};

interface InputData {
  id: string;
  title: string;
  [key: string]: any;
}

export const mapDataToSelect = (inputArray: InputData[]): OptionType[] =>
  inputArray.map((store) => ({
    label: store.title,
    value: store.id,
  }));

interface InputPeople {
  id: string;
  firstName: string;
  lastName: string;
  [key: string]: any;
}

export const mapPeopleDataToSelect = (inputArray: InputPeople[]): OptionType[] =>
  inputArray.map((item) => ({
    label: `${item.firstName ?? ''} ${item.lastName}`,
    value: item.id,
  }));
