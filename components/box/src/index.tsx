import styled from '@emotion/styled';

function px(v: string | number) {
  if (typeof v === 'number') {
    return `${(v || 0).toString()}px`;
  }
  if (typeof v === 'string') {
    if (v.endsWith('px')) return v;
    return `${v}px`;
  }
  return v;
}

function getPadding ({ p, pl, pr, pt, pb, dir }: any) {
  switch (dir) {
    case 'all':
      return px(p);
    case 'top':
      return px(pt);
    case 'bot':
      return px(pb);
    case 'left':
      return px(pl);
    case 'right':
      return px(pr);
    default:
      return px(p);
  }
}

function getMargin ({ m, ml, mr, mt, mb, dir }: any) {
  switch (dir) {
    case 'all':
      return px(m);
    case 'top':
      return px(mt);
    case 'bot':
      return px(mb);
    case 'left':
      return px(ml);
    case 'right':
      return px(mr);
    default:
      return px(m);
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

  height: ${props => props.screen ? '100vh' : props.height ? px(props.height) : 'auto'};
  width: ${props => props.screen ? '100vw' : props.width ? px(props.width) : 'auto'};

  background-color: ${getBgColor};
  color: ${getColor};
  border: ${getBorder};

  cursor: ${props => props.pointer ? 'pointer' : 'default'};
`;