import { TagInputData } from "@components/common/TagInput";
import { CheckboxListOption } from "@components/common/CheckboxList";

export const TAGS: TagInputData[] = [
  { id: "python", name: "Python" },
  { id: "react", name: "React.js" },
];

export const SUGGESTIONS: TagInputData[] = [
  { id: "django", name: "Django" },
  { id: "java", name: "Java" },
  { id: "typescript", name: "Typescript" },
  { id: "nodejs", name: "Node.js" },
  { id: "php", name: "PHP" },
  { id: "csharp", name: "C-Sharp" },
  { id: "graphql", name: "GraphQL" },
  { id: "css", name: "CSS" },
  { id: "html", name: "HTML" },
];

export const YEAR_OF_EXPERIENCES: CheckboxListOption[] = [
  { value: "0-2", label: "0 - 2 Years" },
  { value: "3-5", label: "3 - 5 Years" },
  { value: "6-8", label: "6 - 8 Years" },
  { value: "8+", label: "8+ Years" },
];

export const AVAILABILITY: CheckboxListOption[] = [
  { value: "fullTime", label: "Full Time" },
  { value: "partTime", label: "Part Time" },
  { value: "freelance", label: "Freelance" },
];
