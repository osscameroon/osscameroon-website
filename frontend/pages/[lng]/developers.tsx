import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { BsArrowClockwise, BsXCircle } from "react-icons/bs";

import { AVAILABILITY, DEVELOPERS, SUGGESTIONS, TAGS, YEAR_OF_EXPERIENCES } from "@fixtures/developers";
import intl from "@utils/i18n";
import Layout from "@components/layout/layout";
import Breadcrumb from "@components/common/Breadcrumb";
import TagInput, { TagInputData } from "@components/common/TagInput";
import CheckboxList from "@components/common/CheckboxList";
import Pagination from "@components/common/Pagination";
import Developer from "@components/common/Developer";

const { useTranslation } = intl;

const showAdvancedFilter = false;

const DeveloperPage = () => {
  const { t } = useTranslation();
  const [jobTitle, setJobTitle] = useState("");
  const [tools, setTools] = useState<TagInputData[]>(TAGS);
  const [ossFilterChecked, setOssFilterChecked] = useState(false);

  const onTitleChange = (event) => {
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

  const onPaginationChange = (page: number) => {
    // eslint-disable-next-line no-console
    console.log("Pagination Page : ", page);
  };

  return (
    <Layout title={t("title:developers")}>
      <Breadcrumb links={[{ title: "Developers", href: "" }]} />
      <Container id="developers-list">
        <Row style={{ marginTop: "30px" }}>
          <Col md="3">
            <div className="side-card filter-section">
              <div className="d-flex justify-content-between">
                <div className="bold">Filters</div>
                <div className="cursor-pointer text-color-main">
                  Reset <BsArrowClockwise />
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
                    Title
                  </Label>
                  <Input id="title" placeholder="Full Stack Web Developer" type="text" value={jobTitle} onChange={onTitleChange} />
                </FormGroup>
                <FormGroup>
                  <Label className="filter-label" htmlFor="tools">
                    Tools
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
                    Has open source projects
                  </Label>
                  <FormGroup check>
                    <Label check>
                      <Input checked={ossFilterChecked} type="checkbox" onChange={() => setOssFilterChecked(!ossFilterChecked)} /> Yes
                    </Label>
                  </FormGroup>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-3">
                  <Button className="pl-4 pr-4" color="primary" type="button" onClick={onFilterSubmit}>
                    Filter
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col md="9">
            <div style={{ margin: "0 15px 0 15px" }}>
              <Pagination currentPage={1} itemPerPage={12} nbItems={40} position="top" onPageChange={onPaginationChange} />
              <Row className="developer-section">
                {DEVELOPERS.map((developer) => (
                  <Col key={`develop${developer.id}`} md={4} style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Developer data={developer} />
                  </Col>
                ))}
              </Row>
              <Pagination currentPage={1} itemPerPage={12} nbItems={40} position="bottom" onPageChange={onPaginationChange} />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

DeveloperPage.getInitialProps = async () => ({
  namespacesRequired: ["title"],
});

export default DeveloperPage;
