import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { BsArrowClockwise, BsXCircle } from "react-icons/bs";
import { useIntl } from "react-intl";

import { AVAILABILITY, SUGGESTIONS, YEAR_OF_EXPERIENCES } from "../fixtures/developers";
import Layout from "../components/layout/layout";
import Breadcrumb from "../components/common/Breadcrumb";
import TagInput, { TagInputData } from "../components/common/TagInput";
import CheckboxList from "../components/common/CheckboxList";
import Pagination from "../components/common/Pagination";
import Developer from "../components/common/Developer";
import DeveloperDetailModal from "../components/common/DeveloperDetailModal";
import { ApiResponse, DeveloperQueryParams, GithubUser, PaginationChangeEventData } from "../utils/types";
import { developerMessages, titleMessages } from "../locales/messages";
import ItemSortMethod from "../components/common/ItemSortMethod";
import useFetch from "../components/utils/useFetch";
import { API_BASE_URL } from "../config";
import Loader from "../components/common/Loader";
import NetworkError from "../components/common/NetworkError";

const showAdvancedFilter = false;
const url = `${API_BASE_URL}/github/users/search`;

const DeveloperPage = () => {
  const { formatMessage } = useIntl();
  const [currentPage, setCurrentPage] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [tools, setTools] = useState<TagInputData[]>([]);
  const [ossFilterChecked, setOssFilterChecked] = useState(false);
  const [sortMethod, setSortMethod] = useState("");
  const [developersList, setDevelopersList] = useState<ApiResponse<GithubUser[]> | undefined>();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedDevId, setSelectedDevId] = React.useState("");
  const [showDevModal, setShowDevModal] = React.useState(false);

  const { doFetch, error, loading } = useFetch<ApiResponse<GithubUser[]>>();

  useEffect(() => {
    const firstFetch = async () => {
      const response = await doFetch(url, {});
      setDevelopersList(response);
    };
    firstFetch();
  }, []);

  const openDevModal = () => setShowDevModal(true);

  const closeDevModal = () => {
    setSelectedDevId("");
    setShowDevModal(false);
  };

  const onTitleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setJobTitle(event.target.value);
    if (isSearchMode) setCurrentPage(1);
  };

  const onToolsListChange = (values: TagInputData[]) => {
    setTools(values);
    if (isSearchMode) setCurrentPage(1);
  };

  const onExperienceFilterChange = (values: string[]) => {
    values.toString();
  };

  const onAvailabilityFilterChange = (values: string[]) => {
    values.toString();
  };

  const buildDeveloperQueryParams = (overrides?: DeveloperQueryParams) => {
    return {
      query: `${jobTitle} ${tools.map((value) => value.id).join(" ")}`.trim(),
      page: isSearchMode ? currentPage : 1,
      sort_type: sortMethod,
      // ossFilter: ossFilterChecked ? 'yes' : 'no',
      ...overrides,
    };
  };

  const onFilterSubmit = async () => {
    const response = await doFetch(url, buildDeveloperQueryParams());
    setIsSearchMode(true);
    setDevelopersList(response);
  };

  const onPaginationChange = async (eventData: PaginationChangeEventData) => {
    setCurrentPage(eventData.currentPage);
    const input = buildDeveloperQueryParams({ page: eventData.currentPage });

    const response = await doFetch(url, input);
    setDevelopersList(response);
  };

  const clearJobTitle = () => {
    setJobTitle("");
    setCurrentPage(1);
  };

  const onSearchResetClick = async () => {
    setIsSearchMode(false);
    setDevelopersList(undefined);
    setCurrentPage(1);
    setTools([]);
    setOssFilterChecked(false);
    setJobTitle("");
    setSortMethod("");

    const response = await doFetch(url, buildDeveloperQueryParams({ page: 1 }));
    setDevelopersList(response);
  };

  const onSelectSortMethod = async (method: string) => {
    setSortMethod(method);

    const response = await doFetch(url, buildDeveloperQueryParams({ sort_type: method }));
    setDevelopersList(response);
  };

  return (
    <Layout title={formatMessage(titleMessages.developers)}>
      <Breadcrumb links={[{ title: formatMessage(titleMessages.developers), href: "" }]} />
      <Container id="developers-list">
        <Row className="mt-30">
          <Col md="3">
            <div className="side-card filter-section">
              <div className="d-flex justify-content-between">
                <div className="bold">{formatMessage(developerMessages.filterTitle)}</div>
                <div className="cursor-pointer text-color-main" onClick={onSearchResetClick}>
                  {formatMessage(developerMessages.btnReset)} <BsArrowClockwise />
                </div>
              </div>
              {isSearchMode && jobTitle && (
                <div className="selected-title d-flex justify-content-between align-items-center mt-3 mb-3">
                  <div className="bold w-75">{jobTitle}</div>
                  <div className="cursor-pointer font-weight-bold" onClick={clearJobTitle}>
                    <BsXCircle />
                  </div>
                </div>
              )}
              <div className="dropdown-divider" />
              <Form>
                <FormGroup>
                  <Label className="filter-label" htmlFor="title">
                    {formatMessage(developerMessages.jobTitleLabel)}
                  </Label>
                  <Input
                    id="title"
                    placeholder={formatMessage(developerMessages.jobTitleHint)}
                    type="text"
                    value={jobTitle}
                    onChange={onTitleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="filter-label" htmlFor="tools">
                    {formatMessage(developerMessages.languageLabel)}
                  </Label>
                  <TagInput defaultValues={tools} suggestions={SUGGESTIONS} onChange={onToolsListChange} />
                </FormGroup>
                {showAdvancedFilter && (
                  <>
                    <div className="mb-3">
                      <Label className="filter-label" htmlFor="yoxp">
                        Years of experience
                      </Label>
                      <FormGroup check>
                        <CheckboxList defaultValues={[]} options={YEAR_OF_EXPERIENCES} onChange={onExperienceFilterChange} />
                      </FormGroup>
                    </div>
                    <div className="mt-1 mb-3">
                      <Label className="filter-label" htmlFor="availability">
                        Availability
                      </Label>
                      <FormGroup check>
                        <CheckboxList defaultValues={[]} options={AVAILABILITY} onChange={onAvailabilityFilterChange} />
                      </FormGroup>
                    </div>
                  </>
                )}
                <div className="mt-1">
                  <Label className="filter-label" htmlFor="oss">
                    {formatMessage(developerMessages.hasOssLabel)}
                  </Label>
                  <FormGroup check>
                    <Label check>
                      <Input checked={ossFilterChecked} type="checkbox" onChange={() => setOssFilterChecked(!ossFilterChecked)} />
                      {formatMessage(developerMessages.hasOssValue)}
                    </Label>
                  </FormGroup>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-3">
                  <Button className="pl-4 pr-4" color="primary" type="button" onClick={onFilterSubmit}>
                    {formatMessage(developerMessages.btnFilter)}
                  </Button>
                </div>
              </Form>
            </div>
            <div className="side-card">
              <ItemSortMethod onChange={onSelectSortMethod} />
            </div>
          </Col>
          <Col md="9">
            {error && <NetworkError />}
            {developersList && (
              <div style={{ margin: "0 15px 0 15px" }}>
                {developersList.result?.hits.length && (
                  <Pagination
                    currentPage={currentPage}
                    itemPerPage={developersList.result.limit}
                    position="top"
                    totalItems={developersList.result.nbHits}
                    onPageChange={onPaginationChange}
                  />
                )}
                <Row className="developer-section">
                  {developersList.result?.hits.length &&
                    developersList.result.hits.map((developer) => (
                      <Col key={`develop${developer.id}`} md={4} style={{ marginTop: "20px", marginBottom: "20px" }} onClick={openDevModal}>
                        <Developer developer={developer} />
                      </Col>
                    ))}
                </Row>
                {developersList.result?.hits.length && (
                  <Pagination
                    currentPage={currentPage}
                    itemPerPage={developersList.result.limit}
                    position="bottom"
                    totalItems={developersList.result.nbHits}
                    onPageChange={onPaginationChange}
                  />
                )}
              </div>
            )}
            <Loader loading={loading} />
          </Col>
        </Row>

        <DeveloperDetailModal devId={selectedDevId} visible={showDevModal} onClose={closeDevModal} />
      </Container>
    </Layout>
  );
};

export default DeveloperPage;
