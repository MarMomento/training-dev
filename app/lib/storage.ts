"use client";

export const getLocalStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    // do nothing
    console.log(error);
  }
  return "";
};

export const setLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // do nothing
    console.log(error);
  }
};
