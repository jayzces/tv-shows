[![Netlify Status](https://api.netlify.com/api/v1/badges/c8ba3fde-a0d3-4c61-8f97-49d7ab135a11/deploy-status)](https://app.netlify.com/sites/illustrious-bonbon-3f6709/deploys)

# TV Shows

Coding test for a client, using the [TVMaze API](https://www.tvmaze.com/api). Made with Vue 3 and Vite, to match client requirements.

![preview](preview.jpeg)

## Requirements

- [Node v20.10.0](https://nodejs.org/en)
- [NPM 10.3.0](https://www.npmjs.com/)

## Scripts

```bash
# install dependencies
npm i

# run dev server
npm run dev

# run testing suite with hot reload
npm run test:unit

# run tests once
npm run test:unit:once

# run vitest ui for more details on testing coverage
npm run test:unit:ui
```

## Updates based on Feedback

- Search further improved, now has a loading and empty state
- Dashboard now shows all shows by genre, instead of just 5, with a horizontal scroll
- Removed hardcoded genre list, derive list from returned shows
- Improved store management
  - Use sets to improve mapping speed
  - Reduce loops used throughout
  - Check if data is already in store before querying it (for shows and show images)
  - Move querying for show images to a separate action
