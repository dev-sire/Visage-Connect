# Visage Connect: Real-time Chat Made Easy

**Visage Connect** is a full-featured real-time chat application built with modern web technologies, offering seamless communication for individuals and groups.

### Key Features:

- **Direct Messages (DMs):** Enjoy private, one-on-one conversations with your friends.

- **Group Chats:** Connect with multiple people in a single chat thread, perfect for project collaboration or keeping in touch with large groups.

- **Real-time Communication:** Messages are delivered instantly, fostering a natural flow of conversation.

- **Read Receipts:** See when your messages have been read for added clarity.

- **Modern Tech Stack:** Built with Next.js 14 for a performant and scalable frontend, powered by Typescript for strong typing and code maintainability.

- **Tailwind CSS:** Leverages Tailwind for rapid UI development and a beautiful design.

- **shadCN:** Provides a sleek and customizable dark mode experience.

- **Convex:** Utilizes Convex for a serverless, scalable backend solution (Note: Requires account creation).

- **Clerk:** Employs Clerk for user authentication and authorization (Note: Requires account creation).

### Getting Started

While Visage Connect offers a powerful feature set, the initial setup might involve a few more steps compared to some other solutions. We understand this and have created comprehensive documentation to guide you through the process:

**1. Clone the repository:** ```git clone https://github.com/dev-sire/visage-connect.git```

**2. Install dependencies:** ```npm install``` **or** ```yarn install```

### Backend Setup

To enable the real-time chat functionality, Visage Connect utilizes Convex for the backend. To set up Convex, follow the detailed instructions here: [Convex Guide](https://docs.convex.dev/home) (Account creation required)

### Authentication Setup

Visage Connect leverages Clerk for user authentication and authorization. To configure Clerk, follow the step-by-step guide here: [Clerk Guide](https://clerk.com/docs/quickstarts/setup-clerk ) (Account creation required)

**3. Configure environment variables:**  After completing the Convex and Clerk setups, follow the instructions within the project to set up the required environment variables for these services.

**4. Run the development server:**  ```npm run dev``` **or** ```yarn dev```

### Contributing

We welcome contributions to Visage Connect! Remove bugs, add more features and help Visage Connect become an even better experience for everyone!

### License

Visage Connect is licensed under the MIT License. See the ```LICENSE``` file for details.