import { advocateData } from '../../../db/seed/advocates';
import { advocates } from '../../../db/schema';
import db from '../../../db';

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  try {
    const data = advocateData;
    return Response.json(
      { data },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching advocates:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
