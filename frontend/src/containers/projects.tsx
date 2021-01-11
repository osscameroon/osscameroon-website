import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label, Container, Row, Col } from "reactstrap";
import { BsArrowClockwise } from "react-icons/bs";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";

import Layout from "../components/layout/layout";
import Project from "../components/common/Project";
import Pagination from "../components/common/Pagination";
import Breadcrumb from "../components/common/Breadcrumb";
import TagInput, { TagInputData } from "../components/common/TagInput";
import { projectMessages, titleMessages } from "../locales/messages";
import { PaginationChangeEventData, ProjectFilters } from "../utils/types";
import { getLanguages, searchProject } from "../services/projects";
import { DEFAULT_CACHE_OPTIONS } from "../config";
import ItemSortMethod from "../components/common/ItemSortMethod";

export const ProjectPage = (): JSX.Element => {
  const initialFilters: ProjectFilters = {
    title: "",
    tools: [],
  };
  const [filters, setFilters] = useState(initialFilters);
  const [sortMethod, setSortMethod] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_PER_PAGE = 20;

  const { data: projects_data, error, isLoading } = useQuery(
    ["projects", { page: currentPage, count: ITEM_PER_PAGE, filters, sortMethod }],
    searchProject,
    DEFAULT_CACHE_OPTIONS,
  );

  const { data: languageListData, error: tagsError, isLoading: tagsLoading } = useQuery("tags", getLanguages, DEFAULT_CACHE_OPTIONS);
  const languageTags = languageListData?.result.map((value) => ({ id: value, name: value }));

  const [projectTitle, setProjectTitle] = useState("");
  const [languages, setLanguages] = useState<TagInputData[]>([] as TagInputData[]);
  const { formatMessage } = useIntl();

  const onPaginationChange = (eventData: PaginationChangeEventData) => {
    setCurrentPage(eventData.currentPage);
  };

  const onTitleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setProjectTitle(event.target.value);
  };

  const onLanguageTagChange = (values: TagInputData[]) => {
    setLanguages(values);
  };

  const onFilterSubmit = () => {
    const input = {
      title: projectTitle,
      tools: languages.map((value) => value.id),
    };

    setCurrentPage(1); // Return to page 1

    setFilters((prevState) => ({
      ...prevState,
      ...input,
    }));
  };

  const onResetFilters = () => {
    setFilters((prevState) => ({
      ...prevState,
      ...initialFilters,
    }));
  };

  const onSelectSortMethod = (sortMethod: string) => {
    setSortMethod(sortMethod);
  };

  return (
    <Layout title={formatMessage(titleMessages.projects)}>
      <Breadcrumb links={[{ title: formatMessage(titleMessages.projects), href: "" }]} />

      <Container id="project-list">
        <Row className="mt-30">
          <Col md="3">
            <div className="side-card">
              <div className="d-flex justify-content-between mb-3">
                <div className="bold">{formatMessage(projectMessages.filterTitle)}</div>
                <div className="cursor-pointer text-color-main" onClick={onResetFilters}>
                  {formatMessage(projectMessages.btnReset)} <BsArrowClockwise />
                </div>
              </div>
              <Form>
                <FormGroup>
                  <Label className="font-weight-bold" htmlFor="title">
                    {formatMessage(projectMessages.titleLabel)}
                  </Label>
                  <Input
                    id="title"
                    placeholder={formatMessage(projectMessages.titleHint)}
                    type="text"
                    value={projectTitle}
                    onChange={onTitleChange}
                  />
                </FormGroup>

                {!tagsLoading && !tagsError && (
                  <FormGroup>
                    <Label className="font-weight-bold" htmlFor="languages">
                      {formatMessage(projectMessages.languageLabel)}
                    </Label>
                    <TagInput defaultValues={[]} suggestions={languageTags || []} onChange={onLanguageTagChange} />
                  </FormGroup>
                )}

                <FormGroup className="text-center pt-4">
                  <Button color="primary" onClick={onFilterSubmit}>
                    {formatMessage(projectMessages.btnFilter)}
                  </Button>
                </FormGroup>
              </Form>
            </div>

            <div className="side-card">
              <ItemSortMethod onChange={onSelectSortMethod} />
            </div>
          </Col>

          <Col md="9">
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <> Loading.... </>
            ) : error ? (
              <> Something Went Wrong </>
            ) : (
              <div id="project-row-content">
                <Pagination
                  currentPage={currentPage}
                  itemPerPage={ITEM_PER_PAGE}
                  position="top"
                  totalItems={(projects_data?.result.nbHits || 0) * ITEM_PER_PAGE}
                  onPageChange={onPaginationChange}
                />
                {projects_data?.result.hits.map((project, i) => (
                  <Row className="project-row" key={i}>
                    <Project
                      description={project.description || ""}
                      language={project.language}
                      link={project.html_url}
                      name={project.name}
                      stars={project.stargazers_count}
                      type="big"
                    />
                  </Row>
                ))}
                <Pagination
                  currentPage={currentPage}
                  itemPerPage={ITEM_PER_PAGE}
                  position="bottom"
                  totalItems={(projects_data?.result.nbHits || 0) * ITEM_PER_PAGE}
                  onPageChange={onPaginationChange}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProjectPage;
