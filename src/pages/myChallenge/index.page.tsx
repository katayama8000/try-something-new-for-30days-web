import { Card, Grid } from '@mantine/core';
import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import { DefaultTemplate } from '../../templates/defaultTemplate';

const MyChallenge: NextPage = () => {
  const { push } = useRouter();
  return (
    <DefaultTemplate>
      {[...Array(10)].map((_, i) => {
        return (
          <Grid key={i}>
            <Grid.Col span={4}>
              <Card
                shadow='sm'
                padding='xs'
                onClick={() => {
                  push(`/myChallenge/challenging/${i}`);
                }}
              >
                <div>Card</div>
              </Card>
            </Grid.Col>
          </Grid>
        );
      })}
    </DefaultTemplate>
  );
};

export default MyChallenge;
