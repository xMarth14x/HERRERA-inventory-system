This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

From the repository root, install dependencies and run the frontend:

```bash
npm install
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The root route redirects to the inventory dashboard. The frontend uses local sample data for inventory modules and connects to the Nest API for authentication and user data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Import the repository in Vercel and set the project **Root Directory** to `apps/frontend`. Vercel will detect Next.js and use the workspace lockfile automatically.

Set these environment variables for Preview and Production:

```text
NEXT_PUBLIC_API_URL=https://your-api.example.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-api.example.com
```

Both values are public browser configuration and are frozen into the frontend at build time. The API must allow the deployed Vercel origin through CORS. Without `NEXT_PUBLIC_API_URL`, production uses same-origin `/api/v1`, which is safe for a future Vercel rewrite but does not deploy the Nest backend automatically.

Verify the exact production build locally from the repository root:

```bash
npm run build:frontend
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
