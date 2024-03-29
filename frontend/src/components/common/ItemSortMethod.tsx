import React from "react";
import { useIntl } from "react-intl";
import { Form, FormGroup } from "reactstrap";
import Select from "react-select";

import { projectMessages } from "../../locales/messages";
import { OrderOption } from "../../utils/types";

const orderOptions: OrderOption[] = [
  { value: "popularity", label: "mostPopularOption" },
  { value: "most_recent", label: "mostRecentOption" },
  { value: "alphabetic", label: "alphabeticalOption" },
];

type ItemSortMethodProps = {
  onChange: (sortMethod: string) => void;
};

const ItemSortMethod = ({ onChange }: ItemSortMethodProps) => {
  const { formatMessage } = useIntl();

  const customStyles = {
    menu: (styles: any) => ({
      ...styles,
      background: "var(--light-color)",
    }),
    option: (styles: any) => ({
      ...styles,
      ":hover": {
        background: "var(--option-color)",
        color: "var(--hover-color)",
      },
    }),
  };

  const translatedOrderOptions = orderOptions.map((option) => ({
    ...option,
    label: formatMessage(projectMessages[option.label]),
  }));

  return (
    <>
      <h4 className="bold">{formatMessage(projectMessages.sortTitle)}</h4>
      <Form>
        <FormGroup>
          <Select options={translatedOrderOptions} styles={customStyles} onChange={(e) => onChange(e?.value || "")} />
        </FormGroup>
      </Form>
    </>
  );
};

export default ItemSortMethod;
