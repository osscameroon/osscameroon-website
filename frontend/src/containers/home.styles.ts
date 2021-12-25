import styled, { createGlobalStyle } from "styled-components";

type LightningType = {
  animated: boolean;
};

export const Lightning = styled.img`
  position: absolute;
  height: auto;
  animation: ${({ animated }: LightningType) => (animated ? "fadeInOut 3s linear infinite" : "none")};
  width: 70px;
  top: 385px;
  left: 0;
  transform: none;

  @media (max-width: 768px) {
    top: 300px;
  }

  @media (max-width: 400px) {
    width: 50px;
    top: 370px;
    left: -10px;
  }
`;

export const HomeStyles = createGlobalStyle`
    .decorative-wrapper {
        width: 100%;
        top: -50px;
        position: relative;
    }

    .stars {
        position: absolute;
        top: 0px;
        left: 2px;
        width: 60px;
        height: auto;
        opacity: 0.9;
        animation: balance 4s linear infinite;

        @media (max-width: 768px) {
            width: 50px;
        }

        @media (max-width: 400px) {
            width: 40px;
        }
    }

    .stars.right {
        right: 2px;
        left: auto;
    }

    .moon, .sun {
        position: absolute;
        right: 200px;
        top: -100px;
        width: 600px;
        height: auto;
        opacity: 0.9;

        @media (max-width: 768px) {
            display: none;
        }
    }

    .sun {
        width: 300px;
        top: -70px;
    }

    .sapin {
        position: absolute;
        width: 160px;
        height: auto;
        right: 400px;
        top: 200px;
        z-index: 1;
    }

    @keyframes fadeInOut {

        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.3;
        }

        100% {
            opacity: 1;
        }

    }

    @keyframes balance {
        0% {
            transform: rotate(0deg);
        }

        25% {
            transform: rotate(5deg);
        }

        45% {
            transform: rotate(0deg);
        }

        65% {
            transform: rotate(-5deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }
`;
