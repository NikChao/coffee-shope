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

export default px;