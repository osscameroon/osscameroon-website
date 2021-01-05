import * as React from "react";
import { Row, Col } from "reactstrap";
import LocaleLink from "@components/utils/localeLink";

const style = {
  top: {
    borderTop: "5px var(--primary-color) solid",
    borderRadius: "5px 5px 0 0",
    boxShadow: "var(--border-shadow)",
    padding: "8px 15px 8px 15px",
  },
  bottom: {
    margin: " 25px 0 25px 0",
  },
};

type PaginationProps = {
  position: "top" | "bottom";
  itemPerPage: number;
  nbItems: number;
  currentPage: number;
  href: string;
  query: string;
};

const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
  const isTop = props.position === "top";
  const pages: any[] = [];
  const nbPages: number = Math.floor(props.nbItems / props.itemPerPage);


  if(props.currentPage > 1) {
    pages.push("<");
  }

  // TODO: Refactor in cleaner way
  for (let i = 1; i <= nbPages; i++) {
    if(i <= 3 || i === nbPages) {
      pages.push(i);
    } else if (i === props.currentPage) {
      pages.push(i);
      if(pages[5] === props.currentPage && (props.currentPage + 1) < nbPages) {
        pages[6] = "...";
      }else if(pages[4] === props.currentPage && (props.currentPage + 1) < nbPages){
        pages[6] = "...";
      }
    } else if(i > 3 && i !== props.currentPage && props.currentPage !== 4) {
      pages[4] = "...";
    }
  }

  if(props.currentPage < nbPages){
    pages.push(">");
  }

  const nextPage = props.currentPage < nbPages ? props.currentPage + 1 : props.currentPage;
  const previousPage = props.currentPage > 1 ? props.currentPage - 1 : props.currentPage;

  return (
    <Row style={isTop ? style.top : style.bottom}>
      <Col className="text-left">
        1 - {props.itemPerPage} of more than {props.nbItems} results
      </Col>
      <Col className="text-right">
        {pages.map((value) => {
          let queryValue = 0;

          if(value === "<"){
            queryValue = previousPage;
          }else if(value === ">"){
            queryValue = nextPage;
          }else if(value === "..."){
            queryValue = props.currentPage;
          }else{
            queryValue = value;
          }

          const href = `${props.href}?${props.query}=${queryValue}`;

          return(
            <LocaleLink as={href} href={href} key={value}>
              <a style={value !== props.currentPage ? {color: "var(--dark-color"} : {}}>
                <strong>&nbsp; {value} </strong>
              </a>
            </LocaleLink>
          );
        })}
      </Col>
    </Row>
  );
};

export default Pagination;
