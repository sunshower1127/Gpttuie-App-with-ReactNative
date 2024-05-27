// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Recipe } from "../models/recipe";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkDC-0yh-ho9bEaze7xEQFxDWRXPEP5ic",
  authDomain: "gpttuie.firebaseapp.com",
  projectId: "gpttuie",
  storageBucket: "gpttuie.appspot.com",
  messagingSenderId: "104142120785",
  appId: "1:104142120785:web:e059bf35b822b8da74d570",
  measurementId: "G-GTMKMDR746",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

export async function uploadImages(recipe: Recipe): Promise<void> {
  // 만약 recipe에 있는 image가 file로 시작하는 uri라면 storage에 검색해보고, 없으면 업로드하기.
  // 만약 recipe에 있는 image가 http로 시작하는 uri라면 그대로 사용하기.
  if (!recipe.steps || !recipe.id) {
    alert("uploadImage에서 받는 Recipe 인자 에러.");
    return;
  }

  const listResult = await listAll(ref(storage, `images/${recipe.id}`));
  console.log(
    "listResult: ",
    listResult.items.map((item) => item.name)
  );
  const alreadyExists = listResult.items.map((item) => item.name);

  recipe.steps.forEach(async ({ image }, index, steps) => {
    if (!image || index.toString() in alreadyExists || image.startsWith("http"))
      return;
    const locationRef = ref(storage, `images/${recipe.id}/${index}`);
    const imageResponse = await fetch(image);
    const imageBlob = await imageResponse.blob();
    const result = await uploadBytes(locationRef, imageBlob);
    recipe.steps[index].image = await getDownloadURL(result.ref);
  });
}
