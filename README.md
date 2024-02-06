# The Zooming App

The Zooming App is a Next.js static application designed to allow users to select an image to zoom in on the homepage. Once on the image page, users can further zoom by hovering over it. This README provides an overview of the application, covering its features, coding practices, and production readiness.

## General Features and Quality Assurance

### Features

- **Image Selection**: Users can choose an image on the homepage to zoom in.
- **Image Zooming**: On the image page, users can zoom in on the selected image by hovering over it.

### SEO Implementations

- **General HTML Good Practices**: Such as using alt attributes for images, and defining meta titles and descriptions for improved SEO.
- **Structured Data**: Implemented to provide search engines with additional context about the application's content, enhancing the likelihood of rich snippets in search results.
- **Sitemap**: Generated to facilitate search engine crawling and indexing. It lists all the pages within the application, ensuring they are discoverable by search engines.
- **robots.txt**: Generated to communicate with web crawlers, specifying which pages should or should not be crawled, further optimizing search engine visibility.

### Accessibility

All main accessibility guidelines have been respected, resulting in a 100/100 accessibility score with Lighthouse.

### Security and Best Practices

All main security and best practices have been adhered to, resulting in a 96/100 best practices score with Lighthouse.

### Performance

The app's performance has undergone testing with Lighthouse, yielding a score of 76/100. Enhancements could be made by serving assets through a CDN, although this falls beyond the current project scope. Nevertheless, assets have been compressed to .webp format to mitigate latency.

## Coding Practices

### ESLint and Prettier

- **ESLint**: Used to enforce coding standards and maintain code quality throughout the development process. It helps catch code errors and ensures consistency in code style. The Airbnb guideline has been chosen with some custom edits.
- **Prettier**: Employed for code formatting, ensuring a consistent and aesthetically pleasing codebase. It automatically formats code according to predefined rules, enhancing readability and maintainability.

### Testing Procedures

- **Unit Tests**: Implemented using Jest and testing-library to ensure that utility functions work properly and that React components render expected elements.

- **Integration with CI/CD Pipeline**: Unit tests and lint tests are integrated into the CI/CD pipeline to ensure the reliability and correctness of individual components and functionalities within the application.

## Production Readiness

### Deployment

The app is deployed through a Vercel pipeline which tests and verifies linting before deploying.

### Criteria for Production Readiness

- **Working Features**
- **Minimalist Efficient UX/UI**
- **Responsive Design**
- **SEO Optimization**
- **Performance Optimization**: As a static app, it avoids heavy JavaScript loadings. Web optimized images.
- **Accessibility Guaranteed**
- **CI/CD with Unit and Lint Tests**
- **Monitoring and Logging**: Monitoring of the app through Vercel.

### Areas for Improvement

- Adding end-to-end tests, although the app's size is currently small.
- Using a CMS to dynamically add assets with more precise metadata.

## Getting Started

To get started with The Zooming App, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm run dev`.
4. Navigate to `localhost:3000` in your browser to access the application.
