import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

import style from './chart.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

function createDatesArray() {
  var datesArray = [];
  var today = new Date();
  for (var i = 0; i < 5; i++) {
      var date = new Date(today);
      date.setDate(today.getDate() - i);
      var day = ('0' + date.getDate()).slice(-2);
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var formattedDate = day + '.' + month;
      datesArray.push(formattedDate);
  }
  return datesArray.reverse();
}


function shiftArrayByDateDifference(arr, lastDate, todayDate) {
  let _arr = [...arr]
  // Преобразуем даты в объекты Date
  const last = new Date(lastDate);
  const today = new Date(todayDate);
  
  // Вычисляем разницу в днях между последней датой и сегодняшним днём
  const timeDiff = Math.abs(today.getTime() - last.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Преобразуем миллисекунды в дни и округляем в большую сторону
  console.log(dayDiff)
  // Если последняя дата позже сегодняшней, сдвигаем массив вправо
  if (last > today) {
      for (let i = 0; i < dayDiff; i++) {
        _arr.unshift(0); // Добавляем 0 в начало массива
        _arr.pop(); // Удаляем последний элемент массива
      }
  }
  // Если последняя дата раньше сегодняшней, сдвигаем массив влево
  else if (last < today) {
      for (let i = 0; i < dayDiff; i++) {
        _arr.push(0); // Добавляем 0 в конец массива
        _arr.shift(); // Удаляем первый элемент массива
      }
  }
  console.log(arr)
  return _arr;
}



const Chart = ({className, userData, lastWork}) => {
  // Данные для диаграммы (5 столбцов)
  // userData = userData.sort((a, b) => a - b)
  const data = {
    labels: createDatesArray(),
    datasets: [
      {
        label: 'Выполненные задания',
        data: lastWork.slice(0,10) != new Date().toJSON().slice(0,10) ? shiftArrayByDateDifference(userData, lastWork, new Date().toJSON().slice(0,10)) : userData || [0,0,0,0,0], // Пример данных для столбцов
        backgroundColor: '#D5B9B2',
        borderColor: '#BFB5AF',
        borderWidth: 2,
        borderRadius: 1000,
        width: 445
      },
    ],
  };

  // Опции для столбчатой диаграммы
  const options = {
    scales: {
        y: {
            grid: {
                display: false
            },
            ticks: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false
            },
            barPercentage: 0.2
        },
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            // Change here
            barPercentage: 0.2
        }]
    },
    plugins: {
        legend: {
          display: false,
        },           
    }
}

  return (
    <div className={className}>
      <div className={style.bar}>
        <Bar data={data} options={options} />
      </div>
    </div>
    
  );
};

export default Chart;
