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
`;

export const HomeStyles = createGlobalStyle`
    .decorative-wrapper {
        width: 100%;
        top: -50px;
        position: relative;
        background-color: red; // <<<<<<------------
    }

    .stars {
        position: absolute;
        top: 0px;
        left: 2px;
        width: 60px;
        height: auto;
        opacity: 0.9;
        animation: balance 4s linear infinite;
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

    .lightning {
        position: absolute;
        width: 100px;
        height: auto;
        top: 55px;
        left: 30%;
        transform: rotate(16deg);
        animation: fadeInOut 3s linear infinite;
    }

    .lightning.left {
        width: 70px;
        top: 385px;
        left: 0;
        transform: none;
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
