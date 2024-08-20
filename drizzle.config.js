/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://auth-masterclass_owner:vIZ45ARiTGDU@ep-holy-math-a1puy4es.ap-southeast-1.aws.neon.tech/jerin-ai-content-creater?sslmode=require",
    }
  };