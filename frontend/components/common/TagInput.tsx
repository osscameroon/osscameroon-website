import React, { useEffect, useState } from "react";
import ReactTags from "react-tag-autocomplete";

export type TagInputData = {
  id: string;
  name: string;
};

type TagInputProps = {
  defaultValues: TagInputData[];
  suggestions: TagInputData[];
  onChange: (values: TagInputData[]) => void;
};

const TagInput = ({ defaultValues, onChange, suggestions: defaultSuggestions }: TagInputProps) => {
  const [tags, setTags] = useState(defaultValues);
  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  let reactTags;

  useEffect(() => {
    reactTags = React.createRef();
  }, []);

  const onAddition = (tag: TagInputData) => {
    const tagsClone = [].concat(tags, tag);
    const remainingSuggestions = suggestions.filter((suggestion) => suggestion.id !== tag.id);

    setTags(tagsClone);
    setSuggestions(remainingSuggestions);
    onChange(tagsClone);
  };

  const onDelete = (position: number) => {
    const tagsClone = tags.slice(0);
    const updatedSuggestions = suggestions.slice().concat([tagsClone[position]]);

    tagsClone.splice(position, 1);

    setTags(tagsClone);
    setSuggestions(updatedSuggestions);
    onChange(tagsClone);
  };

  return <ReactTags placeholderText="" ref={reactTags} suggestions={suggestions} tags={tags} onAddition={onAddition} onDelete={onDelete} />;
};

export default TagInput;
