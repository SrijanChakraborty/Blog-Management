Blog Management App
 This is a blog management app built with React Native that allows users to create, edit, view, and delete blog posts. The app supports  Android  platforms with responsive UI design and Firebase backend. In this application user is login through email and password and Signup through name, email, password. Users can only see their own content, not others’. GitHub Repository:https://github.com/SrijanChakraborty/Blog-Management

Technology Stack
---------------------
 React Native (CLI): For cross-platform mobile development.
 Firebase: For authentication and database management.
 react-native-image-crop-picker: For image picking and cropping functionality.
 React Navigation: For handling app navigation between screens.
 Styled Components: For styling the components.

Folder Structure
------------------
/blog-management-app
│
├── /assets                  # Static assets like images
├── /components              # Reusable components (e.g., blog list, input fields)
├── /screens                 # App screens (e.g., Home, AddBlog, EditBlog)
├── /navigation              # Navigation setup (e.g., stack, tab navigation)
├── /services                # Firebase services and API calls
├── /styles                  # Global styles and theme settings
├── /utils                   # Utility functions (e.g., form validation)
├── App.js                   # Entry point for the app
├── package.json             # Project dependencies and scripts
└── .gitignore      

Assumptions and Limitations
  Assumptions:
   Users are authenticated via Firebase Authentication before they can access the app.
   The app assumes an internet connection is required for interacting with Firebase services (authentication, database, etc.).
  Limitations:
   Image upload functionality is limited by the device's camera and gallery capabilities.
   The app currently supports only basic CRUD operations for blog posts.
   Image cropping is supported but may not work perfectly on all devices, depending on the native module’s limitations.

1. Project Overview
    This is a Blog Management App built with React Native and Firebase. It allows users to create, edit, view, and delete blog posts. Features include authentication, image upload , and responsive UI for Android. 
    I did nOt Submit the Ios because i did not have any ios devioce to build and check the project.

2.GitHub Repository Link
    A clickable hyperlink to your GitHub repo where the source code is stored.
   GitHub Repository:https://github.com/SrijanChakraborty/Blog-Management

3.Instructions for Running the Mobile App
    Step-by-step guide for anyone to clone and run your app on their local machine.

    1. Clone the repository
       git clone https://github.com/SrijanChakraborty/Blog-Management

    2. Navigate to the project folder
       cd blog-app

    3. Install dependencies
       npm install 

    4. Run Metro server
       npx react-native start

    5. Open a new terminal and run the app
       For Android: npx react-native run-android

Set Up Firebase
  Create a Firebase project at Firebase Console.
  Set up Firebase Authentication and Firestore Database.
  Add my Firebase config to the app.
  one rule is impiment in this project.