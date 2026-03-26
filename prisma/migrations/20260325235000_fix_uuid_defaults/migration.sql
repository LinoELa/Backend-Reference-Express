CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE "Movie" DROP CONSTRAINT "Movie_createdBy_fkey";
ALTER TABLE "watchlistItem" DROP CONSTRAINT "watchlistItem_userId_fkey";
ALTER TABLE "watchlistItem" DROP CONSTRAINT "watchlistItem_movieId_fkey";

ALTER TABLE "User"
  ALTER COLUMN "id" TYPE UUID USING "id"::uuid,
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "Movie"
  ALTER COLUMN "id" TYPE UUID USING "id"::uuid,
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
  ALTER COLUMN "createdBy" TYPE UUID USING "createdBy"::uuid;

ALTER TABLE "watchlistItem"
  ALTER COLUMN "id" TYPE UUID USING "id"::uuid,
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
  ALTER COLUMN "movieId" TYPE UUID USING "movieId"::uuid,
  ALTER COLUMN "userId" TYPE UUID USING "userId"::uuid;

ALTER TABLE "Movie"
  ADD CONSTRAINT "Movie_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "watchlistItem"
  ADD CONSTRAINT "watchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "watchlistItem"
  ADD CONSTRAINT "watchlistItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
