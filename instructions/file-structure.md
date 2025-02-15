---
description: Describes the file structure of the project
globs: 
---
# Introduction

The file structure of Driftful plays a vital role in providing a clear and organized roadmap for everyone involved in development and maintenance. With a focus on a mobile-first web application for task, note, and event tracking, this well-organized file structure supports rapid development and effective collaboration. Driftful is built for minimalist users who appreciate the simplicity of Bullet Journals, and its structure reflects both the simplicity of the design and the need for a robust offline-first strategy.

# Overview of the Tech Stack

Driftful uses React Native with Expo as its core framework, enabling a smooth cross-platform experience for iOS, Android, and web users through TypeScript. Supabase is employed as the backend and storage solution, ensuring that offline-first data handling is in place while also providing secure user authentication and reliable cloud synchronization. The file structure is designed with these tools in mind, ensuring that both front-end and back-end components are organized logically, making it easier to navigate between UI components, configuration files, and data handling modules.

# Root Directory Structure

At the very top level of the project, there are several main directories and key files that set the stage for the entire application. The root directory contains source code, configuration, assets, and documentation folders that are clearly segmented into purposes. The 'src' directory hosts all the application code such as screens, components, and services, while the 'assets' folder holds images, icons, and style resources that maintain Driftful’s minimal notebook-style appearance. Supporting configuration files like 'package.json', 'tsconfig.json', and 'app.json' are located at the root to ensure that dependencies, TypeScript configurations, and Expo settings are easily accessible. This structure supports straightforward navigation and quick access to crucial parts of the project for both developers and new team members.

# Configuration and Environment Files

A dedicated configuration area is included in the file structure to manage environment variables, build configurations, and dependency definitions. Files such as '.env', '.env.development', and '.env.production' are stored at the root level to clearly separate settings for different stages of development. Additional configuration files like 'babel.config.js' or 'metro.config.js' ensure that the project builds and runs correctly across multiple platforms. These files are crucial for managing the connection between the local development setup and the synchronization with Supabase, as well as maintaining seamless behavior in offline and online modes.

# Documentation Structure

Driftful’s documentation is organized in a dedicated folder, ensuring that all technical and design-related guides are easy to locate and reference. The 'docs' directory contains critical documents such as the project requirements document, app flow document, tech stack documentation, and backend structure details. This clear separation not only aids in quality assurance but also serves as a central repository for knowledge sharing among team members. Well-organized documentation enables rapid onboarding and provides a single source of truth for how the application is expected to function and evolve over time.

# Conclusion and Overall Summary

In summary, the file structure for Driftful is designed to support the project’s development and long-term maintenance with clarity and precision. Every folder and file has been purposefully organized to create a consistent and accessible environment for both front-end and back-end development. The structure takes into account the unique needs of an offline-first mobile-first web app inspired by the simple elegance of Bullet Journals. The emphasis on simplicity, rapid entry, and robust offline functionality is mirrored in a file organization that stands out by being both developer-friendly and clearly navigable for non-technical stakeholders alike.
