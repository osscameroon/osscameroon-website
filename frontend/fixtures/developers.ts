import { TagInputData } from "@components/common/TagInput";
import { CheckboxListOption } from "@components/common/CheckboxList";
import { DeveloperData } from "@utils/types";

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

export const DEVELOPERS: DeveloperData[] = [
  {
    id: "1",
    title: "Full Stack Web Developer",
    name: "Robert Fox",
    picture: "/static/fixtures/developers/dev-1.svg",
    tools: ["Python", "Django", "Flask", "React", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Backend Developer",
    name: "Brooklyn Simmons",
    picture: "/static/fixtures/developers/dev-2.svg",
    tools: ["Java", "Spring", "Oracle", "Tomcat"],
  },
  {
    id: "3",
    title: "Frontend Developer",
    name: "Devon Lane",
    picture: "/static/fixtures/developers/dev-3.svg",
    tools: ["Angular", "Bootstrap", "SASS", "Angular Material"],
  },
  {
    id: "4",
    title: "Machine Learning Engineer",
    name: "Ronald Richards",
    picture: "/static/fixtures/developers/dev-4.svg",
    tools: ["Python", "SQL", "Flask", "Keras", "Tensorflow", "Numpy", "Panda"],
  },
  {
    id: "5",
    title: "Devops Engineer",
    name: "Kathryn Murphy",
    picture: null,
    tools: ["Python", "Bash", "Docker", "Jenkins", "Terraform"],
  },
  {
    id: "6",
    title: "Full Stack Web Developer",
    name: "Cody Fisher",
    picture: null,
    tools: ["Node.js", "React", "MongoDB", "Express", "Typescript"],
  },
  {
    id: "7",
    title: "Backend Developer",
    name: "Cameron Williamson",
    picture: "/static/fixtures/developers/dev-5.svg",
    tools: ["Spring boot", "Java", "Node.js", "Typescript", "GraphQL", "MySQL"],
  },
  {
    id: "8",
    title: "Product Manager",
    name: "Esther Howard",
    picture: null,
    tools: ["Sketch", "Notion", "Figma", "Excel"],
  },
  {
    id: "9",
    title: "Devops Engineer",
    name: "Darlene Robertson",
    picture: "/static/fixtures/developers/dev-1.svg",
    tools: ["Docker", "Kubernetes", "Ansible", "Github Action", "Linux", "AWS", "Gitlab CI"],
  },
];
