/**
 * app/api/cron/publish-scheduled/route.ts
 * POST /api/cron/publish-scheduled — background job to trigger scheduled publications
 */

import { NextRequest } from "next/server";
import { handlePublishScheduledCron } from "@/controllers/article.controller";

export async function POST(_req: NextRequest) {
  return handlePublishScheduledCron();
}

export async function GET(_req: NextRequest) {
  return handlePublishScheduledCron();
}
