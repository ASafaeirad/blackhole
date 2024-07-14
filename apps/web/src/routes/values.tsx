import { ValuesPage } from '@blackhole/task/values-page';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '../Layout';

export const Route = createFileRoute('/values')({
  component: () => (
    <Layout title="values">
      <ValuesPage />
    </Layout>
  ),
});
