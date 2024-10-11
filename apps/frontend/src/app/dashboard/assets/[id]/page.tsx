import { AssetDetails } from 'src/sections';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <AssetDetails id={id} />;
}
