# Employee Management - Angular Mini Project

A mini project built with Angular that demonstrates basic employee management functionality. The app implements **responsive web design**, functional **login**, **data listing with search/sort/pagination**, and **form handling with validation** across four main pages.

## 🧩 Features

- **Login Page**  
  Hardcoded username/password authentication with basic form validation.
  For example, you can use this credentials:
- **Credentials**

  - username : abc123
  - password : 123123123

- **Employee List Page**

  - Displays 100+ dummy employees
  - Pagination, sorting, searching (AND logic with 2+ fields)
  - Page size selection
  - Add employee button
  - Edit/Delete action buttons with colored toast notifications

- **Add Employee Page**

  - Full employee form with validation
  - Datepicker for birthdate (must not be in the future)
  - Email and numeric field validation
  - Group dropdown with searchable list
  - Save and Cancel buttons

- **Employee Detail Page**
  - Shows formatted employee detail.
  - “OK” button returns to list and retains previous search/filter state

## 👤 Employee Data Structure

Each employee has the following attributes:

```json
{
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "birthDate": "datetime",
  "basicSalary": "double",
  "status": "string",
  "group": "string",
  "description": "datetime"
}
```

## 👤 Env Configuration
To run this Angular project properly, you need to configure the environment file.

### 📂 Step-by-step Instructions:

1. **Go to the folder:**
    - src/environments/
2. **Create a new file named:**
    - environment.development.ts
3. **Copy the content from `environment.ts` into this new file, and make sure it looks like this:**

```ts
import { EnvironmentInterface } from "./environment.interface";

export const environment: EnvironmentInterface = {
  production: false,
  LOCALKEY: 'qwertyuiop123456789+@',
};
