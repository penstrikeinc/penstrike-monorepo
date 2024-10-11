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
  inputArray.map((item) => ({
    label: item.title,
    value: item.id,
  }));

interface InputPeople {
  id: string;
  firstName: string;
  lastName: string;
  [key: string]: any;
}

interface InputPentest {
  id: string;
  name: string;
  [key: string]: any;
}

export const mapPeopleDataToSelect = (inputArray: InputPeople[]): OptionType[] =>
  inputArray.map((item) => ({
    label: `${item.firstName ?? ''} ${item.lastName}`,
    value: item.id,
  }));

export const mapPentestDataToSelect = (inputArray: InputPentest[]): OptionType[] =>
  inputArray.map((item) => ({
    label: item.name,
    value: item.id,
  }));
