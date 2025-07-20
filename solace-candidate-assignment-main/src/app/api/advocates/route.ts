import { advocateData } from '../../../db/seed/advocates';
import { advocates } from '../../../db/schema';
import db from '../../../db';

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);
  const data = advocateData;
  return Response.json({ data });
}
