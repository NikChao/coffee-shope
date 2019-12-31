import styled from '@emotion/styled';
import pixel from '@coffee-shope/px';

function getPadding ({ p, pl, pr, pt, pb, dir }: any) {
  switch (dir) {
    case 'all':
      return pixel(p);
    case 'top':
      return pixel(pt);
    case 'bot':
      return pixel(pb);
    case 'left':
      return pixel(pl);
    case 'right':
      return pixel(pr);
    default:
      return pixel(p);
  }
}

function getMargin ({ m, ml, mr, mt, mb, dir }: any) {
  switch (dir) {
    case 'all':
      return pixel(m);
    case 'top':
      return pixel(mt);
    case 'bot':
      return pixel(mb);
    case 'left':
      return pixel(ml);
    case 'right':
      return pixel(mr);
    default:
      return pixel(m);
  }
}

function getBgColor ({ backgroundColor }: Props) {
  return backgroundColor ?? 'none';
}

function getColor ({ color }: Props) {
  return color ?? 'inherit';
}

function getBorder ({ border }: Props) {
  return border ?? 'none';
}

type Props = { [key: string]: any, };

export const Box = styled.div<Props>`
  display: ${props => props.flex ? 'flex' : ''};
  padding: ${props => getPadding({ ...props, dir: 'all' })};
  padding-top: ${props => getPadding({ ...props, dir: 'top' })};
  padding-bottom: ${props => getPadding({ ...props, dir: 'bot' })};
  padding-left: ${props => getPadding({ ...props, dir: 'left' })};
  padding-right: ${props => getPadding({ ...props, dir: 'right' })};

  margin: ${props => getMargin({ ...props, dir: 'all' })};
  margin-top: ${props => getMargin({ ...props, dir: 'top' })};
  margin-bottom: ${props => getMargin({ ...props, dir: 'bot' })};
  margin-left: ${props => getMargin({ ...props, dir: 'left' })};
  margin-right: ${props => getMargin({ ...props, dir: 'right' })};

  display: ${props => props.flex ? 'flex' : 'block'};
  justify-content: ${props => props.jc || 'flex-start'};
  align-items: ${props => props.ai || 'stretch'};
  align-content: ${props => props.ac || 'stretch'};

  height: ${props => props.screen ? '100vh' : props.height ? pixel(props.height) : 'auto'};
  width: ${props => props.screen ? '100vw' : props.width ? pixel(props.width) : 'auto'};

  background-color: ${getBgColor};
  color: ${getColor};
  border: ${getBorder};

  cursor: ${props => props.pointer ? 'pointer' : 'default'};
`;