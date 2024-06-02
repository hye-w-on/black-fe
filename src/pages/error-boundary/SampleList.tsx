import { useSamples } from '../../react-query/hooks/SampleHook';

const SampleList = () => {
  const { data } = useSamples();

  return <div>{data?.map((item: any, idx: any) => <div key={idx}>{item.title}</div>)}</div>;
};

export default SampleList;
