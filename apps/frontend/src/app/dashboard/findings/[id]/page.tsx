import { FindingDetailsSection } from 'src/sections';

export const metadata = {
  title: 'Dashboard: Finding Details',
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <FindingDetailsSection id={id} />;
}
