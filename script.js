"use strict";

const API_KEY = "l6r9ioBysRRbGJMPoyq1UZGLqDSaBumCmgOerqBC";
const btnView = document.querySelector(".view-btn");
const inputDate = document.querySelector(".input-date");
const apodImg = document.querySelector(".apod-image");
const apodTitle = document.querySelector(".image-title");
const apodDesc = document.querySelector(".image-desc");

async function fetchData(date) {

    const today= new Date().toISOString().slice(0, 10);
    if(today<date){
        alert('Please enter a date from past')
    } 
    else{
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
    );
    if (!response.ok) throw new Error("Error in fetching the data");
    const data = await response.json();
    displayImage(data);
  } catch (error) {
    console.error(error.message);
  }
}
}

function displayImage(data) {
    apodTitle.textContent = data.title;
    apodDesc.innerHTML = "";
    apodImg.style.transition = "ease-in 1s";
    apodImg.src = data.url;
  setTimeout(() => {
    animateText(data.explanation);
  }, 500);
}

function animateText(text) {
  const words = text.split(" ");
  let i = 0;
  const interval = setInterval(() => {
    if (i < words.length) {
      apodDesc.innerHTML += words[i] + " ";
      i++;
    } else {
      clearInterval(interval);
    }
  }, 100);
}

inputDate.addEventListener("change", () => {
  const date = inputDate.value;
  if (date) {
    fetchData(date);
  } else {
    alert("Please enter a date");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  inputDate.value = todayDate;
  fetchData(todayDate);
});
