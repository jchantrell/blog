import styled from "styled-components";

const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  text-align: center;
`;

const BodyModel = styled.div`
  postion: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  cursor: pointer;
  background-color: transparent;
`;

export { Container, BodyModel };
