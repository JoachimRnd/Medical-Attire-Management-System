# Medical-Attire-Management-System

## Project Overview

This project was developed during my Erasmus exchange program at the Technological University of Dublin, working collaboratively with an international team of students. The system aims to streamline the management of medical uniforms (scrubs) in healthcare facilities.

## Project Description

MAMS is a comprehensive web-based application that helps healthcare facilities manage their medical uniforms inventory and distribution. The system offers:

### Key Features

- **User Authentication**: Secure login system for staff members
- **Inventory Management**: Track scrubs availability, sizes, and conditions
- **Distribution Tracking**: Monitor scrubs allocation to healthcare workers
- **Return Processing**: Handle returns and cleaning status
- **Usage Analytics**: Generate reports on uniform usage patterns
- **Size Management**: Track available sizes and stock levels
- **User Roles**: Different access levels for staff and administrators

### Technology Stack

- Frontend: React.js
- Backend: Express.js
- Database: PostgreSQL

## Important Commands

Open `Medical-Attire-Management-System` Folder in CLI and hit:

```
npm install
```

Then change directory to `Medical-Attire-Management-System\api` and hit:

```
cd api
npm install
```

Then change directory to `Medical-Attire-Management-System\client` and hit:

```
cd client
npm install
```

## Create working environment variables File:

Open `Medical-Attire-Management-System\api` Folder in any IDE and create a File called `.env` where you put in the link for the DB-Connection

```
DATABASE_URL=yourDBConnection
```

## Start Dev Server

in Terminal with:

```
npm start
```

```
npm run dev
```

Frontend runs on http://localhost:3000/ - Backend runs on http://localhost:9000/

```
cd Medical-Attire-Management-System
npm install
cd api
npm install
cd ../client
npm install
cd ..
npm start
```
