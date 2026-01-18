import { useRouter } from 'next/router';
import PublicProfilePage from '../../src/app/hushh-id/[...id]/page';

export default function HushhIdPage() {
  const { query } = useRouter();
  return <PublicProfilePage params={{ id: query.id }} />;
}
