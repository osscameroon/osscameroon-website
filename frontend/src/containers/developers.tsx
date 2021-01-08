import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { BsArrowClockwise, BsXCircle } from "react-icons/bs";
import { useIntl } from "react-intl";

import { AVAILABILITY, SUGGESTIONS, TAGS, YEAR_OF_EXPERIENCES } from "../fixtures/developers";
import Layout from "../components/layout/layout";
import Breadcrumb from "../components/common/Breadcrumb";
import TagInput, { TagInputData } from "../components/common/TagInput";
import CheckboxList from "../components/common/CheckboxList";
// import Pagination from "../components/common/Pagination";
// import Developer from "../components/common/Developer";
import DeveloperDetailModal from "../components/common/DeveloperDetailModal";
// import { PaginationChangeEventData } from "../utils/types";
import { developerMessages, titleMessages } from "../locales/messages";
import { useQuery } from "react-query";
import { findUsers } from "../services/developers";

const showAdvancedFilter = false;

/*const defaultUserData: ApiResponse<GithubUser[]> = {
  code: 200,
  status: "success",
  result: {
    hits: [],
    offset: 0,
    limit: 20,
    nbHits: 0,
  },
};*/

const DeveloperPage = () => {
  const { formatMessage } = useIntl();
  // const [userData, setUserData] = useState<ApiResponse<GithubUser[]>>(defaultUserData);
  // const [currentPage, setCurrentPage] = useState(1);

  const { data: usersData, error, isLoading } = useQuery("users", findUsers);

  // eslint-disable-next-line no-console
  console.log(usersData);

  const [jobTitle, setJobTitle] = useState("");
  const [tools, setTools] = useState<TagInputData[]>(TAGS);
  const [ossFilterChecked, setOssFilterChecked] = useState(false);

  const [selectedDevId, setSelectedDevId] = React.useState("");
  const [showDevModal, setShowDevModal] = React.useState(false);

  // const openDevModal = () => setShowDevModal(true);

  const closeDevModal = () => {
    setSelectedDevId("");
    setShowDevModal(false);
  };

  const onTitleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setJobTitle(event.target.value);
  };

  const onToolsListChange = (values: TagInputData[]) => {
    // eslint-disable-next-line no-console
    console.log("Tools : ", values);
    setTools(values);
  };

  const onExperienceFilterChange = (values: string[]) => {
    // eslint-disable-next-line no-console
    console.log("Experience : ", values);
  };

  const onAvailabilityFilterChange = (values: string[]) => {
    // eslint-disable-next-line no-console
    console.log("Availability : ", values);
  };

  const onFilterSubmit = () => {
    const input = {
      title: jobTitle,
      tools: tools.map((value) => value.id),
      ossFilter: ossFilterChecked,
    };

    // eslint-disable-next-line no-console
    console.log(input);
  };

  /*const onPaginationChange = (eventData: PaginationChangeEventData) => {
    // eslint-disable-next-line no-console
    console.log("Pagination Page : ", eventData);
    // setCurrentPage(eventData.currentPage);
  };*/

  return (
    <Layout title={formatMessage(titleMessages.developers)}>
      <Breadcrumb links={[{ title: formatMessage(titleMessages.developers), href: "" }]} />
      <Container id="developers-list">
        <Row className="mt-30">
          <Col md="3">
            <div className="side-card filter-section">
              <div className="d-flex justify-content-between">
                <div className="bold">{formatMessage(developerMessages.filterTitle)}</div>
                <div className="cursor-pointer text-color-main">
                  {formatMessage(developerMessages.btnReset)} <BsArrowClockwise />
                </div>
              </div>
              <div className="selected-title d-flex justify-content-between align-items-center mt-3 mb-3">
                <div className="bold w-75">Full Stack Web Developer</div>
                <div className="cursor-pointer font-weight-bold">
                  <BsXCircle />
                </div>
              </div>
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
                  <TagInput defaultValues={TAGS} suggestions={SUGGESTIONS} onChange={onToolsListChange} />
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
          </Col>
          <Col md="9">
            {/*<div style={{ margin: "0 15px 0 15px" }}>
              {userData.result?.hits.length && (
                <Pagination
                  itemPerPage={userData.result.limit}
                  position="top"
                  totalItems={userData.result.nbHits}
                  onPageChange={onPaginationChange}
                />
              )}
              <Row className="developer-section">
                {userData.result?.hits.length &&
                  userData.result.hits.map((developer) => (
                    <Col key={`develop${developer.id}`} md={4} style={{ marginTop: "20px", marginBottom: "20px" }} onClick={openDevModal}>
                      <Developer developer={developer} />
                    </Col>
                  ))}
              </Row>
              {userData.result?.hits.length && (
                <Pagination
                  itemPerPage={userData.result.limit}
                  position="bottom"
                  totalItems={userData.result.nbHits}
                  onPageChange={onPaginationChange}
                />
              )}
            </div>*/}
          </Col>
        </Row>

        <DeveloperDetailModal devId={selectedDevId} visible={showDevModal} onClose={closeDevModal} />
      </Container>
    </Layout>
  );
};

export default DeveloperPage;
