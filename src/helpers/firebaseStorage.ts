import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const addImage = async (title: string, imgFile: File) => {
  const storageRef = ref(storage, title);
  await uploadBytes(storageRef, imgFile);
};

export const deleteImage = async (title: string): Promise<void> => {
  const storageRef = ref(storage, title);
  await deleteObject(storageRef);
};

export const getImage = async (title: string): Promise<string> => {
  return await getDownloadURL(ref(storage, title));
};
