<<<<<<< HEAD
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
=======
# 🎵 SongVerse – Music Library Mobile App

<div align="center">

### A Feature-Rich, High-Performance Cross-Platform Music Discovery Application

Built with **React Native**, **Expo Router**, and **Firebase** to deliver a seamless, native music browsing experience with secure authentication, persistent state management, and an adaptive user interface.

[![Project Status](https://img.shields.io/badge/Project_Status-Completed-success.svg?style=flat-square)](https://github.com/Irchika774/music-app-expo-firebase)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000000?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

[Explore Repository](https://github.com/Irchika774/music-app-expo-firebase) · [Report Issue](https://github.com/Irchika774/music-app-expo-firebase/issues) · [Request Feature](https://github.com/Irchika774/music-app-expo-firebase/issues)

</div>

---

## 📖 Overview

**SongVerse** is a modern, production-grade music library mobile application engineered using **React Native** and the **Expo** ecosystem. The application showcases advanced architectural patterns in mobile development, featuring robust serverless authentication, structural navigation flows, local client-side data persistence, and an optimized user experience complete with dynamic micro-interactions.

Designed with clean architecture in mind, SongVerse acts as a strong portfolio piece demonstrating real-world integration of cloud-based identity providers alongside localized device storage.

---

## ✨ Features & Functionality

- 🔐 **Firebase Authentication:** Secure user registration, login, and session lifecycle management, fully bound with protected file-system routes.
- 🔀 **File-Based Routing:** Organized multi-screen navigation hierarchy utilizing modern **Expo Router** mechanics.
- 📊 **Local Data Persistence:** On-device persistent tracking of user interaction metrics, including **Song Ratings** and **Viewing History** powered by `AsyncStorage`.
- 🌓 **Dynamic Theme Engine:** Native-driven Light and Dark mode variations built to align with system-level user preferences.
- 🎨 **Micro-Interactions:** Enhanced user engagement via buttery-smooth layout transitions and hardware-accelerated **Lottie Animations**.

---

## 🛠 Tech Stack

### Core Frameworks & Routing
*   **Framework:** React Native
*   **Tooling Ecosystem:** Expo (Managed Workflow)
*   **Navigation:** Expo Router (File-based navigation paradigm)

### Backend & Storage Infrastructure
*   **Identity Provider:** Firebase Authentication
*   **Local Caching Layer:** React Native `@react-native-async-storage/async-storage`

### UI & Animation
*   **Animation Engine:** Lottie for React Native (`lottie-react-native`)
*   **Styling:** StyleSheet API / Vector Icons

---

## 🏗 System Architecture

```text
         ┌─────────────────────────┐
         │     Expo Router UI      │
         └────┬───────────────┬────┘
              │               │
  (Protected Routes)     (Local Cache)
              ▼               ▼
 ┌────────────────┐       ┌────────────────┐
 │ Firebase Auth  │       │  AsyncStorage  │
 │ (Cloud Layer)  │       │ (Device Layer) │
 └────────────────┘       └────────────────┘
>>>>>>> dd4ce0dcfe1d0120e78b3b968f2d4a1d6b41733e
