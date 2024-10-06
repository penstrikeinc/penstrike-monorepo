import { AssetsDetails } from 'src/sections';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <AssetsDetails id={id} />;
}
