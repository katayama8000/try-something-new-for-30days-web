import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { DefaultTemplate } from '../../../templates/defaultTemplate';

const Challenging: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  return <DefaultTemplate>{slug}</DefaultTemplate>;
};

export default Challenging;
