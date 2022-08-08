import { TopRowWrapper, Heading } from '../../containers/styles/main.styles';

const HeadingBanner = ({ text }) => {
  return (
    <TopRowWrapper>
      <div>
        <Heading>{text}</Heading>
      </div>
    </TopRowWrapper>
  );
};

export default HeadingBanner;
