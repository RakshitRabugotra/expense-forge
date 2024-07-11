# Expense Forge

Expense Forge is a web application designed to help users manage their finances effectively. With Expense Forge, users can easily track and analyze their expenses, providing valuable insights into their spending habits.

## Features

- **Expense Tracking**: Record and categorize your expenses.
- **Data Visualization**: Get insights into your spending with charts and graphs.
- **User Authentication**: Secure login and registration for users.
- **Responsive Design**: Access your expense data on any device.

## Technologies Used

- **Next.js**: React framework for building server-side rendering and static web applications.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **Supabase**: Open source Firebase alternative for backend services, including database and authentication.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/RakshitRabugotra/expense-forge.git
   ```

2. **Install dependencies**

   Navigate to the project directory and install the required dependencies using npm or yarn.

   ```bash
   cd expense-forge
   npm install
   ```

3. **Set up Supabase**

   - Create a project in [Supabase](https://supabase.com).
   - Obtain the Supabase URL and API key from your Supabase project.
   - Create a `.env.local` file in the root of your project and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the application**
   Start the development server:
   ```bash
   npm run dev
   ```

Open http://localhost:8080 in your browser to see the application.

## Usage

- **Register/Login:** Create an account or log in to start tracking your expenses.
- **Add Expense:** Record your expenses by providing details such as amount, category, and date.
- **View Insights:** Analyze your spending habits with visualizations and insights.

## Contributing

Contributions are welcome! If you have any ideas or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/RakshitRabugotra/expense-forge/blob/main/LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)

## Contact

**Rakshit Rabugotra** - [LinkedIn](https://www.linkedin.com/in/rakshit-rabugotra-a29b5821a/)

**Project Link:** https://github.com/RakshitRabugotra/expense-forge
