import React, { useState } from "react";
import { Input, Label } from "reactstrap";

export type CheckboxListOption = {
  label: string;
  value: string;
};

type CheckboxListProps = {
  defaultValues: string[];
  options: CheckboxListOption[];
  onChange: (values: string[]) => void;
};

const CheckboxList = ({ defaultValues, onChange, options }: CheckboxListProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValues);

  const isSelected = (value: string) => {
    return selectedOptions.includes(value);
  };

  const onChoiceChange = (event: { target: { value: any } }) => {
    const { value } = event.target;

    const isOptionExist = selectedOptions.includes(value);
    if (!isOptionExist) {
      const updatedOptions = selectedOptions.concat([value]);
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
    } else {
      const remainingOptions = selectedOptions.filter((choice) => choice !== value);
      setSelectedOptions(remainingOptions);
      onChange(remainingOptions);
    }
  };

  return (
    <>
      {options.map((option) => (
        <>
          <Label key={option.value} check>
            <Input checked={isSelected(option.value)} type="checkbox" value={option.value} onChange={onChoiceChange} /> {option.label}
          </Label>
          <br />
        </>
      ))}
    </>
  );
};

export default CheckboxList;
