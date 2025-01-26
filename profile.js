import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

// DOM Elements
const nameInput = document.getElementById("user-name");
const bioInput = document.getElementById("user-bio");
const departmentInput = document.getElementById("user-department");
const collegeInput = document.getElementById("user-college");
const yearSelect = document.getElementById("user-year");
const courseInput = document.getElementById("user-course");
const hobbiesInput = document.getElementById("user-hobbies");
const goalsInput = document.getElementById("user-goals");
const saveBtn = document.getElementById("save-btn");
const photoInput = document.getElementById("photo-input");
const profilePhoto = document.getElementById("profile-photo");

// Fetch User Profile from Firebase
function loadProfile() {
  const userRef = ref(db, "users/profile");
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const profile = snapshot.val();
      nameInput.value = profile.name || "";
      bioInput.value = profile.bio || "";
      departmentInput.value = profile.department || "";
      collegeInput.value = profile.college || "";
      yearSelect.value = profile.year || "";
      courseInput.value = profile.course || "";
      hobbiesInput.value = profile.hobbies || "";
      goalsInput.value = profile.goals || "";
      if (profile.photoURL) {
        profilePhoto.src = profile.photoURL;
      }
    }
  });
}

// Save Profile to Firebase
function saveProfile(photoURL = null) {
  const userProfile = {
    name: nameInput.value,
    bio: bioInput.value,
    department: departmentInput.value,
    college: collegeInput.value,
    year: yearSelect.value,
    course: courseInput.value,
    hobbies: hobbiesInput.value,
    goals: goalsInput.value,
    photoURL: photoURL || profilePhoto.src,
  };

  set(ref(db, "users/profile"), userProfile)
    .then(() => alert("Profile saved successfully!"))
    .catch((error) => alert("Error saving profile: " + error));
}

// Upload Photo to Firebase Storage
function uploadPhoto(file) {
  const fileRef = storageRef(storage, "profile_photos/" + file.name);
  uploadBytes(fileRef, file)
    .then(() => getDownloadURL(fileRef))
    .then((url) => {
      profilePhoto.src = url;
      saveProfile(url); // Save profile with the photo URL
    })
    .catch((error) => alert("Error uploading photo: " + error));
}

// Event Listeners
saveBtn.addEventListener("click", () => saveProfile());
photoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadPhoto(file);
  }
});

// Load Profile on Page Load
document.addEventListener("DOMContentLoaded", loadProfile);
