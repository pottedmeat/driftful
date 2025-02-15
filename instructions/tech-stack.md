---
description: Describes the tech stack for the project
globs: 
---
# Introduction

Driftful is a mobile-first web app designed for minimalist users and Bullet Journal enthusiasts who want a quick digital method to track tasks, notes, and events. The platform is created with simplicity and ease of use in mind. Its goal is to provide a clean, uncluttered interface where users can rapidly capture new ideas, tasks, or events and see them automatically organized into pages (day range), weekly, monthly, or yearly views. By embracing a minimalist design, Driftful addresses the overwhelming complexity found in larger task managers while still keeping essential functionality in place.

# Frontend Technologies

The application's frontend is built using React Native with Expo and TypeScript, enhanced by NativeWind and NativeWindUI for styling and UI components. This combination allows Driftful to maintain a native look and feel on both iOS and Android devices while also providing a smooth experience on mobile and desktop web browsers. Leveraging React Native ensures that the user interface is responsive, and Expo streamlines development and deployment across multiple platforms. NativeWind provides a Tailwind CSS-like styling experience, while NativeWindUI offers a comprehensive set of pre-built components that maintain consistency across platforms. The use of TypeScript adds an extra layer of reliability and clarity to the code by catching potential issues early. A design philosophy that emphasizes a notebook-style look with soft colors, clear icons, and large, intuitive buttons is further supported by the integration of Lovable, an AI tool that assists in generating both front-end and full-stack code. This integration helps maintain a consistent, clean aesthetic that aligns with the app's overall minimalist philosophy.

# Backend Technologies

On the backend, Driftful uses Supabase as its core service for both user data and authentication, ensuring that the application remains securely connected to a reliable cloud platform. The project also follows an offline-first design by incorporating local storage solutions to allow users to access and modify their data even when there is no internet connection. This architecture means that tasks, events, and notes are stored locally and synchronized with Supabase when connectivity is available, providing a seamless experience with no compromise on data integrity. The backend is designed to manage user data efficiently while supporting the automatic migration of tasks across different timeframes, ensuring that information flows logically from daily entries to longer-term plans.

# Infrastructure and Deployment

The infrastructure behind Driftful is set up to prioritize reliability, scalability, and ease of deployment. Expo is not only used for frontend development but also serves as a valuable tool for managing different build configurations and deployment pipelines across various platforms. Supabase acts as the cloud storage and backend service, coordinating user authentication and data synchronization even when the application is offline. These choices ensure that Driftful can handle growing user bases and evolving requirements without sacrificing performance. The development process is further enhanced by tools like Cursor, an AI-powered coding IDE that provides real-time suggestions and streamlines the coding process. Together, these technologies create an environment where continuous integration and smooth deployments become standard practices.

# Third-Party Integrations

Driftful keeps its integrations to a minimum to maintain the simplicity of the user experience. The principal third-party service is Supabase, which handles backend functions such as user authentication, data storage, and synchronization with offline data. The integration of Lovable assists in generating a clean and consistent look for both the front-end and the full-stack code without cluttering the application with additional features that might complicate the user interface. This streamlined use of third-party systems ensures that the application remains focused on its core functionality while leveraging powerful tools to support development and user satisfaction.

# Security and Performance Considerations

Security is built into every layer of Driftful's tech stack. The use of Supabase provides secure API endpoints and robust user authentication methods, ensuring that data is protected during storage and synchronization. Even when operating offline, the application adheres to strict security measures by managing local data responsibly until it can be securely synchronized with the cloud. On the performance side, Driftful is optimized for rapid data entry and smooth navigation. By focusing on an offline-first design, the app reduces load times and minimizes disruptions caused by connectivity issues. The integration of secure and high-performance storage solutions, combined with a minimalist user interface, means that every user interaction is designed to be quick, straightforward, and safe.

# Conclusion and Overall Tech Stack Summary

In summary, Driftful's technology choices are all about balancing simplicity with robust functionality. The frontend is built with React Native, Expo, and TypeScript to ensure a smooth and responsive user experience across multiple platforms. The backend leverages Supabase for secure, cloud-based data management while incorporating an offline-first approach that guarantees data accessibility even without an immediate internet connection. The infrastructure is geared towards reliability and efficient deployments through the use of modern CI/CD practices and tools like Cursor and Lovable. With a keen emphasis on security and performance, each element of the tech stack works together to create a lightweight yet powerful platform that is both easy to use and scalable. Driftful stands out by offering a unique mix of minimalist design and smart migration features that cater specifically to the needs of digital minimalists and bullet journal enthusiasts.
