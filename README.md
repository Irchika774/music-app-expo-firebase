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
