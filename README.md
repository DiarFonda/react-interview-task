Flex Project

    This project is a basic version of the required task provided for the interview. Given that I have limited experience with the tech stack you use, I decided to implement the solution using simple React and Ant Design for the frontend and Supabase for the backend. I built the backend APIs using ExpressJS and focused primarily on implementing the core logic of how the app functions. However, I did not dive deeply into the specific business logic requirements, as I understood this was an interview task and I didn’t want to bother with too many questions.

Tech Stack

    Frontend: React with Ant Design for UI components
    Backend: Supabase and ExpressJS for API handling

Running the Project

    This project is structured as a monorepo. To get it up and running, follow these steps:

    Navigate to the project root:
        cd flex-project

    Start the frontend:
        npm run start:frontend

    In another terminal tab, start the backend:
        npm run start:backend

        How might you make this app more secure?

             Implement secure authentication mechanisms (e.g., JWT) to restrict access to certain routes and ensure only authorized users can access the app.

             Validate and sanitize all inputs, especially user-generated data, to prevent security vulnerabilities like SQL injection and XSS attacks.

             Ensure that all communication between the client and server happens over HTTPS to prevent man-in-the-middle attacks.

             Move sensitive data, such as API keys and database credentials, to environment variables rather than hardcoding them in the codebase.



         How would you make this solution scale to millions of records?

             Ensure the database has proper indexing to make searching and fetching data faster.

             We could implement pagination on both the frontend and backend so the app doesn't load too much data at once.

             We could use load balancing to spread traffic across different servers, ensuring the app stays fast and available.

             We could use caching (e.g., Redis) for frequently requested data to reduce the load on the database.

             Add more servers as the app grows. This can be done with cloud services like AWS or Google Cloud.

             While Supabase is great for smaller projects, for a larger app that needs to scale, it might make sense to use a custom-built backend to get more control over performance and scaling.

Portfolio

    To learn more about my skills and recent projects, feel free to check my portfolio website:

        https://www.diarfonda.com/resume
