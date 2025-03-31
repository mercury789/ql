function set(name, value) {

   localStorage.setItem(name, value)

}
function rem(name) {

   localStorage.removeItem(name)

}
function get(name) {

   return localStorage.getItem(name)
}
function clear() {
   localStorage.clear()
}
import { videos } from './videos.js';

function video(mode) {

   function random(mode) {
      let src = 0;
      const old = Number(get(mode))
      console.log(`OLD RANDOM: ${old}`);
      do {
         src = Math.floor(Math.random() * videos[mode]) + 1;
         console.log(`NEW RANDOM: ${src}`);

      } while (src === old);

      return src;
   }


   if (mode === 'upgrade') {
      document.querySelector('[data-video] source').setAttribute('src', `video/upgrade/1.mp4`)
   } else {

      const src = random(mode);
      document.querySelector('[data-video] source').setAttribute('src', `video/${mode}/${src}.mp4`);
      set(mode, src)
   }

   document.querySelector('[data-video]').load()

   document.querySelector('[data-video]').oncanplaythrough = () => {
      document.querySelector('[data-video]').style = "opacity: 1; pointer-events: all;"
      document.querySelector('[data-video]').play()
   };

}


function rang(num) {
   if (num <= 0) return 0; // Обработка случаев, когда num <= 0
   const step = 4.3;
   const src = Math.ceil(num / step) - 1; // Вычисляем нужный индекс
   return Math.min(src, 22); // Ограничиваем максимум до 22 (для num > 94.6)
}
function bgRang(num) {
   if (num <= 0) return 0;

   const thresholds = [4.3, 17.2, 30.1, 43.0, 55.9, 68.8, 81.7, 94.6];

   for (let i = 0; i < thresholds.length; i++) {
      if (num < thresholds[i]) {
         return i; // Убираем +1, чтобы соответствовать диапазонам
      }
   }

   return thresholds.length; // Если num больше всех порогов
}

if (get('bgRang')) {

   document.querySelector('body').style = get('bgRang')
}


var initialDateStr = new Date().toUTCString();

var ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 700;


if (get('barData') && JSON.parse(get('barData')).length !== 0) {

   document.querySelector('[data-start]').remove()

   var barData = JSON.parse(get('barData'))

   let endObj = barData[barData.length - 1];

   let oldProcent = endObj.c;

   // push + upd + save

   let today = new Date();
   let day = today.getDate(); // день
   let month = today.getMonth() + 1; // месяц (нумерация с 0)
   let year = today.getFullYear(); // год

   const date = `${day}${month}${year}`;

   let miss = Number(date) - Number(endObj.date) - 100000
   console.log(`${miss} = ${Number(date)} - ${Number(endObj.date)}`);
   console.log(miss);


   if (endObj.date !== date) {

      for (let index = miss; index >= 0; index -= 100000) {

         if (index === 0) {
            barData.push({ x: Date.now(), o: oldProcent, h: oldProcent, l: oldProcent, c: oldProcent, date: date })
         } else {

            const newX = Number(barData[barData.length - 1].x) + 86400000
            const newDate = Number(barData[barData.length - 1].date) + 100000

            barData.push({ x: newX, o: oldProcent, h: oldProcent, l: oldProcent, c: oldProcent, date: newDate })
         }

      }


      if (barData.length === 3) {
         if (barData[0].date === '') {
            barData.shift()
         }
      }

      set('barData', JSON.stringify(barData))

   }




} else {

   var barData = [];

}


var lineData = barData.map(data => ({ x: data.x, y: data.c }));

var chart = new Chart(ctx, {
   type: 'candlestick',
   data: {
      datasets: [

         {
            label: '',
            data: barData,
            borderColor: '#100F14',

         },

         {
            label: '',
            type: 'line',
            data: lineData,
            hidden: true,
         }

      ]
   }
});

var update = function () {
   var dataset = chart.config.data.datasets[0];

   // candlestick vs ohlc
   var type = document.getElementById('type').value;
   chart.config.type = type;

   // linear vs lo.g
   /*
   var scaleType = document.getElementById('scale-type').value;
   chart.config.options.scales.y.type = scaleType;
   */

   // color

   var colorScheme = document.getElementById('color-scheme').value;
   if (colorScheme === 'neon') {
      chart.config.data.datasets[0].backgroundColors = {
         up: '#20B16B',
         down: '#EE4448',
         unchanged: '#999',

      };
   } else {
      delete chart.config.data.datasets[0].backgroundColors;
   }


   // border
   /*
   var border = document.getElementById('border').value;
   if (border === 'false') {
     dataset.borderColors = 'rgba(0, 0, 0, 0)';
   } else {
     delete dataset.borderColors;
   }
   */

   // mixed charts
   /*
   var mixed = document.getElementById('mixed').value;
   if (mixed === 'true') {
     chart.config.data.datasets[1].hidden = false;
   } else {
     chart.config.data.datasets[1].hidden = true;
   }
   */

   chart.update();
};

[...document.getElementsByTagName('select')].forEach(element => element.addEventListener('change', update));
/*
document.getElementById('update').addEventListener('click', update);
*/


if (get('base')) {
   document.querySelector('[data-body]').innerHTML = get('base')
   document.querySelector('[data-stat]').innerHTML = get('stat')


} else {

   document.querySelector('[data-body]').innerHTML = `
  
   <div class="block">
   
     <div class="pos-block">
   
        <div data-pos-list>
   
        </div>
     </div>
   
     <div class="neg-block">

        <div data-neg-list>
   
        </div>
     </div>

   </div>

     `

   document.querySelector('[data-stat]').innerHTML = `
  
  <div class="stat-top">
     <div class="icon"><img data-rang src="icon/0.png"></div>
     <span> </span>
     <span class='name'>QL/PRC</span>
     <span> </span>
     <span data-profit>0.00%</span>
  </div>
 
  <div><span data-procent>0.00</span><span> </span></div>
  
   <div>⠀</div>
  
  `


}


document.addEventListener("click", (event) => {

   if (event.target.closest("[data-mode]")) {

      if (document.querySelector('[data-body]').classList.contains('_active')) {
         document.querySelector('[data-body]').classList.remove('_active')
         document.querySelector('[data-task-main]').classList.remove('_active')

      } else {
         document.querySelector('[data-body]').classList.add('_active')
         document.querySelector('[data-task-main]').classList.add('_active')
      }


   }


   if (event.target.closest("[data-fix]")) {


      if (event.target.classList.contains('_active')) {
         event.target.classList.remove('_active')
         document.querySelector('body').style.overflow = 'auto'
      } else {
         event.target.classList.add('_active')
         document.querySelector('body').style.overflow = 'hidden'


      }

   }


   if (event.target.closest("[data-pos-add]")) {


      document.querySelector('[data-pos-add]').style.display = 'none'
      document.querySelector('[data-neg-add]').style.display = 'none'
      document.querySelector('[data-mode]').style.display = 'none'


      let input = document.createElement('input')

      let inputSecond = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 10px; left: 10px; width: 100px; color: #FCFCFC;'
      input.setAttribute("tabindex", "-1")


      inputSecond.type = 'number'
      inputSecond.style = 'position: fixed; bottom: 10px; left: 135px; width: 40px; color: rgb(75, 192, 192);'
      inputSecond.setAttribute("tabindex", "-1")


      document.body.appendChild(input)
      document.body.appendChild(inputSecond)


      input.focus()


      let num


      function mainText() {


         if (input.value && inputSecond.value || inputSecond.value === 0) {

            let decorProc = inputSecond.value

            if (inputSecond.value >= 10) {
               decorProc = 10
            }


            document.querySelector('[data-pos-list]').insertAdjacentHTML('beforeend', `
            <div data-point data-pos-point>

            <div data-decor data-pos-decor style="width: ${decorProc * 10}%">
            </div>

            <div class="flex">

             <div data-name>${input.value}</div>
             <div data-pos-span data-span>${inputSecond.value}</div>

             </div>

            </div>
            `)

            /*
            const base = document.querySelector('[data-body]').innerHTML
            
            set('base', base) 
            
            const stat = document.querySelector('[data-stat]').innerHTML
            set('stat', stat) 
            */

         }


      }

      function mainNum() {


         let num = Number(inputSecond.value)


         if ((num || num === 0) && input.value) {

            if (!document.querySelector('[data-start]')) {


               let sum = 0;
               document.querySelectorAll('[data-span]').forEach(div => {
                  let num = parseFloat(div.textContent);
                  if (!isNaN(num)) sum += num;
               });

               let posSum = 0;
               document.querySelectorAll('[data-pos-span]').forEach(div => {
                  let num = parseFloat(div.textContent);
                  if (!isNaN(num)) posSum += num;
               });


               let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
               let procent = Number(procentBig.toFixed(2))

               console.log(`
               ======== [data-pos-add]
               posSum: ${posSum}
               sum: ${sum}
               procent: ${procent} = (${posSum} / ${sum}) * 100
               `)


               let today = new Date();
               let day = today.getDate(); // день
               let month = today.getMonth() + 1; // месяц (нумерация с 0)
               let year = today.getFullYear(); // год

               const date = `${day}${month}${year}`;


               let checkDate = barData.find(obj => obj.date === date)

               if (checkDate) {


                  if (procent > checkDate.o) {

                     document.querySelector('[data-procent]').style.color = 'rgb(75, 192, 192)'

                     let profit = procent - checkDate.o
                     profit = profit.toFixed(2)

                     let docProfit = document.querySelector('[data-profit]')

                     docProfit.innerText = `+${profit}%`
                     docProfit.style.color = 'rgb(75, 192, 192)'
                     docProfit.style.backgroundColor = 'rgba(75, 192, 192, 0.5)'

                     if (procent > checkDate.c) {

                        if (checkDate.c < checkDate.o) {
                           if (!up) {
                              video('comeback')
                              console.log(`comeback: ${checkDate.c} < ${checkDate.o}`);
                           }
                        } else {
                           if (procent > checkDate.h) {
                              checkDate.h = procent

                              if (!up) {
                                 video('recordWin')
                                 console.log(`recordWin: ${procent} > ${checkDate.h}`);
                              }
                           } else {
                              if (!up) {
                                 video('win')
                                 console.log(`win: ${procent} > ${checkDate.c}`);
                              }
                           }
                        }


                     } else {

                        if (!up) {
                           video('lose')
                           console.log(`lose: ${procent} < ${checkDate.c}`);
                        }

                     }

                  } else {

                     document.querySelector('[data-procent]').style.color = 'rgb(255, 99, 132)'


                     let profit = procent - checkDate.o
                     profit = profit.toFixed(2)

                     let docProfit = document.querySelector('[data-profit]')

                     docProfit.innerText = `${profit}%`
                     docProfit.style.color = 'rgb(255, 99, 132)'
                     docProfit.style.backgroundColor = 'rgba(255, 99, 132, 0.5)'

                     if (procent > checkDate.c) {

                        if (!up) {
                           video('win')
                           console.log(`win: ${procent} > ${checkDate.l}`);
                        }

                     } else {

                        if (procent < checkDate.l) {
                           checkDate.l = procent

                           if (!up) {
                              video('recordLose')
                              console.log(`recordLose: ${procent} < ${checkDate.l}`);
                           }
                        } else {
                           if (!up) {
                              video('lose')
                              console.log(`lose: ${procent} < ${checkDate.c}`);
                           }
                        }

                     }


                  }

                  checkDate.c = procent

               }

               chart.update()

               set('barData', JSON.stringify(barData))

               procent = procent.toFixed(2)
               document.querySelector('[data-procent]').innerText = `${procent}`
               document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.png`)
               document.querySelector('body').style = `background-image: url("bg/${bgRang(Number(procent))}.jpg");`
               set('bgRang', `background-image: url("bg/${bgRang(Number(procent))}.jpg");`)
               console.log(`RANG: ${bgRang(Number(procent))}`);

               const base = document.querySelector('[data-body]').innerHTML
               set('base', base)

               const stat = document.querySelector('[data-stat]').innerHTML
               set('stat', stat)

            }

            let points = document.querySelectorAll('[data-pos-point]')

            if (points.length > 1) {

               let sortPoints = Array.from(points).sort((a, b) => {
                  return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
               })

               let posList = document.querySelector('[data-pos-list]')
               posList.innerHTML = ''

               sortPoints.forEach(e => {

                  posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
               })


            }

            const base = document.querySelector('[data-body]').innerHTML
            set('base', base)

            const stat = document.querySelector('[data-stat]').innerHTML
            set('stat', stat)

         }

      }


      let blurStatus = true
      let blurStatusSecond = true


      input.addEventListener('keydown', (event) => {


         if (event.key === 'Enter') {
            event.preventDefault()

            blurStatus = false

            inputSecond.focus()

         }

      })


      inputSecond.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            blurStatusSecond = false

            mainText()
            mainNum()
            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'

         }

      })


      input.addEventListener('blur', (event) => {

         if (blurStatus) {

            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'

         }

      })


      inputSecond.addEventListener('blur', (event) => {

         if (blurStatusSecond) {

            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'

         }


      })


   }

   if (event.target.closest("[data-neg-add]")) {

      document.querySelector('[data-pos-add]').style.display = 'none'
      document.querySelector('[data-neg-add]').style.display = 'none'
      document.querySelector('[data-mode]').style.display = 'none'


      let input = document.createElement('input')
      let inputSecond = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 10px; left: 10px; width: 100px; color: #FCFCFC;'
      input.setAttribute("tabindex", "-1")


      inputSecond.type = 'number'
      inputSecond.style = 'position: fixed; bottom: 10px; left: 135px; width: 40px; color: rgb(255, 99, 132);'
      inputSecond.setAttribute("tabindex", "-1")


      document.body.appendChild(input)
      document.body.appendChild(inputSecond)

      input.focus()

      let num


      function mainText() {

         if (input.value && inputSecond.value || inputSecond.value === 0) {

            let decorProc = inputSecond.value

            if (inputSecond.value >= 10) {
               decorProc = 10
            }

            document.querySelector('[data-neg-list]').insertAdjacentHTML('beforeend', `
        <div data-point data-neg-point>
        
         <div data-decor data-neg-decor style="width: ${decorProc * 10}%">
         </div>
        
        <div class="flex">
        
        
         <span data-name>${input.value}</span>
          <div data-neg-span data-span>${inputSecond.value}</div>
        
         
         </div>
         
        </div>
        `)
            /*
                    const base = document.querySelector('[data-body]').innerHTML
                    
                    set('base', base) 
                    
                    const stat = document.querySelector('[data-stat]').innerHTML
                    set('stat', stat) 
                    */

         }

      }

      function mainNum() {


         let num = Number(inputSecond.value)

         if ((num || num === 0) && input.value) {

            if (!document.querySelector('[data-start]')) {



               let sum = 0;
               document.querySelectorAll('[data-span]').forEach(div => {
                  let num = parseFloat(div.textContent);
                  if (!isNaN(num)) sum += num;
               });

               let posSum = 0;
               document.querySelectorAll('[data-pos-span]').forEach(div => {
                  let num = parseFloat(div.textContent);
                  if (!isNaN(num)) posSum += num;
               });


               let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
               let procent = Number(procentBig.toFixed(2))

               console.log(`
               ======== [data-neg-add]
               posSum: ${posSum}
               sum: ${sum}
               procent: ${procent} = (${posSum} / ${sum}) * 100
               `)

               let today = new Date();
               let day = today.getDate(); // день
               let month = today.getMonth() + 1; // месяц (нумерация с 0)
               let year = today.getFullYear(); // год

               const date = `${day}${month}${year}`;


               let checkDate = barData.find(obj => obj.date === date)

               if (checkDate) {

                  if (procent > checkDate.o) {

                     document.querySelector('[data-procent]').style.color = 'rgb(75, 192, 192)'

                     let profit = procent - checkDate.o
                     profit = profit.toFixed(2)

                     let docProfit = document.querySelector('[data-profit]')

                     docProfit.innerText = `+${profit}%`
                     docProfit.style.color = 'rgb(75, 192, 192)'
                     docProfit.style.backgroundColor = 'rgba(75, 192, 192, 0.5)'

                     if (procent > checkDate.c) {

                        if (checkDate.c < checkDate.o) {
                           if (!up) {
                              video('comeback')
                              console.log(`comeback: ${checkDate.c} < ${checkDate.o}`);
                           }
                        } else {
                           if (procent > checkDate.h) {
                              checkDate.h = procent

                              if (!up) {
                                 video('recordWin')
                                 console.log(`recordWin: ${procent} > ${checkDate.h}`);
                              }
                           } else {
                              if (!up) {
                                 video('win')
                                 console.log(`win: ${procent} > ${checkDate.c}`);
                              }
                           }
                        }


                     } else {

                        if (!up) {
                           video('lose')
                           console.log(`lose: ${procent} < ${checkDate.c}`);
                        }

                     }

                  } else {

                     document.querySelector('[data-procent]').style.color = 'rgb(255, 99, 132)'


                     let profit = procent - checkDate.o
                     profit = profit.toFixed(2)

                     let docProfit = document.querySelector('[data-profit]')

                     docProfit.innerText = `${profit}%`
                     docProfit.style.color = 'rgb(255, 99, 132)'
                     docProfit.style.backgroundColor = 'rgba(255, 99, 132, 0.5)'


                     if (procent > checkDate.c) {

                        if (!up) {
                           video('win')
                           console.log(`win: ${procent} > ${checkDate.l}`);
                        }

                     } else {

                        if (procent < checkDate.l) {
                           checkDate.l = procent

                           if (!up) {
                              video('recordLose')
                              console.log(`recordLose: ${procent} < ${checkDate.l}`);
                           }
                        } else {
                           if (!up) {
                              video('lose')
                              console.log(`lose: ${procent} < ${checkDate.c}`);
                           }
                        }

                     }

                  }

                  checkDate.c = procent


               }

               chart.update()

               set('barData', JSON.stringify(barData))


               procent = procent.toFixed(2)
               document.querySelector('[data-procent]').innerText = `${procent}`
               document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.png`)
               document.querySelector('body').style = `background-image: url("bg/${bgRang(Number(procent))}.jpg");`
               set('bgRang', `background-image: url("bg/${bgRang(Number(procent))}.jpg");`)
               console.log(`RANG: ${bgRang(Number(procent))}`);


               const base = document.querySelector('[data-body]').innerHTML
               set('base', base)

               const stat = document.querySelector('[data-stat]').innerHTML
               set('stat', stat)


            }

            let points = document.querySelectorAll('[data-neg-point]')

            if (points.length > 1) {

               let sortPoints = Array.from(points).sort((a, b) => {
                  return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
               })

               let posList = document.querySelector('[data-neg-list]')
               posList.innerHTML = ''

               sortPoints.forEach(e => {

                  posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
               })


            }


            const base = document.querySelector('[data-body]').innerHTML
            set('base', base)

            const stat = document.querySelector('[data-stat]').innerHTML
            set('stat', stat)

         }

      }


      let blurStatus = true
      let blurStatusSecond = true


      input.addEventListener('keydown', (event) => {


         if (event.key === 'Enter') {
            event.preventDefault()

            blurStatus = false

            inputSecond.focus()

         }

      })


      inputSecond.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            blurStatusSecond = false

            mainText()
            mainNum()
            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'


         }

      })


      input.addEventListener('blur', (event) => {

         if (blurStatus) {

            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'


         }

      })


      inputSecond.addEventListener('blur', (event) => {

         if (blurStatusSecond) {

            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'

         }


      })


   }

   if (event.target.closest("[data-clear]")) {

      clear()
      event.target.style.backgroundColor = '#33181B'

   }

   if (event.target.closest("[data-start]")) {

      event.target.remove()

      let sum = 0;
      document.querySelectorAll('[data-span]').forEach(div => {
         let num = parseFloat(div.textContent);
         if (!isNaN(num)) sum += num;
      });

      let posSum = 0;
      document.querySelectorAll('[data-pos-span]').forEach(div => {
         let num = parseFloat(div.textContent);
         if (!isNaN(num)) posSum += num;
      });


      let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
      let procent = Number(procentBig.toFixed(2))

      console.log(`
      ======== [data-start]
      posSum: ${posSum}
      sum: ${sum}
      procent: ${procent} = (${posSum} / ${sum}) * 100
      `)


      let today = new Date();
      let day = today.getDate(); // день
      let month = today.getMonth() + 1; // месяц (нумерация с 0)
      let year = today.getFullYear(); // год

      const date = `${day}${month}${year}`;


      barData.push({ x: Date.now() - 86400000, o: procent, h: procent, l: procent, c: procent, date: '' })

      barData.push({ x: Date.now(), o: procent, h: procent, l: procent, c: procent, date: date })

      set('barData', JSON.stringify(barData))
      chart.update()

      document.querySelector('[data-procent]').innerText = `${procent.toFixed(2)}`
      document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.png`)
      document.querySelector('body').style = `background-image: url("bg/${bgRang(Number(procent))}.jpg");`
      set('bgRang', `background-image: url("bg/${bgRang(Number(procent))}.jpg");`)
      console.log(`RANG: ${bgRang(Number(procent))}`);


      const base = document.querySelector('[data-body]').innerHTML
      set('base', base)

      const stat = document.querySelector('[data-stat]').innerHTML
      set('stat', stat)

   }


   if (event.target.closest("[data-export]")) {
      const base = get('base');
      const stat = get('stat');
      const bgRang = get('bgRang');
      const taskBody = get('taskBody');

      let today = new Date();
      let day = today.getDate(); // день
      let month = today.getMonth() + 1; // месяц (нумерация с 0)
      let year = today.getFullYear(); // год

      const date = `${day}.${month}.${year}`;

      event.target.style.backgroundColor = '#112A21';

      const copy = barData;
      const content = `${JSON.stringify(copy)}@${base}@${stat}@${bgRang}@${taskBody}`;
      navigator.clipboard.writeText(content);


      // Создаем Blob (файл в памяти)
      const blob = new Blob([content], { type: "text/plain" });

      // Создаем ссылку на Blob и эмулируем клик по ней для скачивания файла
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `save_${date}.txt`; // Имя файла
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Освобождаем память
      URL.revokeObjectURL(a.href);
   }


   // if (event.target.closest("[data-export-log]")) {
   //    let barDataClean = JSON.parse(get('barData'))

   //    event.target.style.backgroundColor = '#112A21'


   //    navigator.clipboard.writeText(`${JSON.stringify(barData)}`);

   // }


   if (event.target.closest("[data-import]")) {

      event.target.style.backgroundColor = '#112A21'


      navigator.clipboard.readText().then(text => {

         let parts = text.split('@');
         let firstText = parts[0];
         firstText = JSON.parse(firstText)
         let secondText = parts[1];
         let thirdText = parts[2]


         set('barData', JSON.stringify(firstText))
         set('base', secondText)
         set('stat', thirdText)


      }).catch(err => {
         console.error("Ошибка при чтении с буфера обмена:", err);
      });

   }

   if (event.target.closest("[data-span]")) {

      document.querySelector('[data-pos-add]').style.display = 'none'
      document.querySelector('[data-neg-add]').style.display = 'none'
      document.querySelector('[data-mode]').style.display = 'none'


      let oldValueString = event.target.innerText
      let oldValue = Number(oldValueString)

      let input = document.createElement('input')

      input.type = 'number'


      input.style = 'position: fixed; bottom: 10px; left: 10px; width: 40px;'
      input.setAttribute("tabindex", "-1")

      if (event.target.closest('[data-pos-list]')) {
         input.style.color =
            'rgb(75, 192, 192)'
      } else {
         input.style.color =
            'rgb(255, 99, 132)'
      }

      document.body.appendChild(input)

      input.focus()


      let blurStatus = true

      function mainNum() {

         let num = Number(input.value)

         event.target.innerHTML = num


         if ((num || num === 0) && num !== oldValue) {

            let decorProc = num

            if (decorProc >= 10) {
               decorProc = 10
            }

            event.target.closest('[data-point]').querySelector('[data-decor]').style.width = `${decorProc * 10}%`


            if (!document.querySelector('[data-start]')) {


               let sum = 0;
               document.querySelectorAll('[data-span]').forEach(div => {
                  let num = parseFloat(div.textContent);
                  if (!isNaN(num)) sum += num;
               });

               let posSum = 0;
               document.querySelectorAll('[data-pos-span]').forEach(div => {
                  let num = parseFloat(div.textContent);
                  if (!isNaN(num)) posSum += num;
               });


               let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
               let procent = Number(procentBig.toFixed(2))

               console.log(`
               ======== [data-span]
               posSum: ${posSum}
               sum: ${sum}
               procent: ${procent} = (${posSum} / ${sum}) * 100
               `)

               let today = new Date();
               let day = today.getDate(); // день
               let month = today.getMonth() + 1; // месяц (нумерация с 0)
               let year = today.getFullYear(); // год

               const date = `${day}${month}${year}`;

               let checkDate = barData.find(obj => obj.date === date)

               procent = procent.toFixed(2)

               const oldRang = Number(document.querySelector('[data-rang]').getAttribute('src').match(/\d+/))
               const nowRang = rang(Number(procent))
               console.log(nowRang);


               document.querySelector('[data-procent]').innerText = `${procent}`
               document.querySelector('[data-rang]').setAttribute('src', `icon/${nowRang}.png`)
               document.querySelector('body').style = `background-image: url("bg/${bgRang(Number(procent))}.jpg");`
               set('bgRang', `background-image: url("bg/${bgRang(Number(procent))}.jpg");`)
               console.log(`RANG: ${bgRang(Number(procent))}`);


               var up = false

               if (nowRang > oldRang) {
                  // повышен ранг 

                  video('upgrade')


                  up = true

               } else {

                  // if (nowRang !== oldRang) {
                  //    // понижен ранг 

                  //    document.querySelector('[data-video-2]').style = "display: block;"
                  //    document.querySelector('[data-video-2]').play()
                  // }

               }

               console.log(`UPPPPPPP${up}`);


               if (checkDate) {

                  if (procent > checkDate.o) {
                     // (больше open)

                     document.querySelector('[data-procent]').style.color = 'rgb(75, 192, 192)'

                     let profit = procent - checkDate.o
                     profit = profit.toFixed(2)

                     let docProfit = document.querySelector('[data-profit]')

                     docProfit.innerText = `+${profit}%`
                     docProfit.style.color = 'rgb(75, 192, 192)'
                     docProfit.style.backgroundColor = 'rgba(75, 192, 192, 0.5)'

                     if (procent > checkDate.c) {

                        if (checkDate.c < checkDate.o) {
                           if (!up) {
                              video('comeback')
                              console.log(`comeback: ${checkDate.c} < ${checkDate.o}`);
                           }
                        } else {
                           if (procent > checkDate.h) {
                              checkDate.h = procent

                              if (!up) {
                                 video('recordWin')
                                 console.log(`recordWin: ${procent} > ${checkDate.h}`);
                              }
                           } else {
                              if (!up) {
                                 video('win')
                                 console.log(`win: ${procent} > ${checkDate.c}`);
                              }
                           }

                        }


                     } else {

                        if (!up) {
                           video('lose')
                           console.log(`lose: ${procent} < ${checkDate.c}`);
                        }

                     }


                  } else {
                     // (меньше open)

                     document.querySelector('[data-procent]').style.color = 'rgb(255, 99, 132)'


                     let profit = procent - checkDate.o
                     profit = profit.toFixed(2)

                     let docProfit = document.querySelector('[data-profit]')

                     docProfit.innerText = `${profit}%`
                     docProfit.style.color = 'rgb(255, 99, 132)'
                     docProfit.style.backgroundColor = 'rgba(255, 99, 132, 0.5)'


                     if (procent > checkDate.c) {

                        if (!up) {
                           video('win')
                           console.log(`win: ${procent} > ${checkDate.l}`);
                        }

                     } else {

                        if (procent < checkDate.l) {
                           checkDate.l = procent

                           if (!up) {
                              video('recordLose')
                              console.log(`recordLose: ${procent} < ${checkDate.l}`);
                           }
                        } else {
                           if (!up) {
                              video('lose')
                              console.log(`lose: ${procent} < ${checkDate.c}`);
                           }
                        }

                     }


                  }

                  checkDate.c = procent


               }

               chart.update()

               set('barData', JSON.stringify(barData))

               const base = document.querySelector('[data-body]').innerHTML
               set('base', base)

               const stat = document.querySelector('[data-stat]').innerHTML
               set('stat', stat)


            }

            if (event.target.hasAttribute('data-pos-span')) {

               let points = document.querySelectorAll('[data-pos-point]')

               if (points.length > 1) {

                  let sortPoints = Array.from(points).sort((a, b) => {
                     return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
                  })

                  let posList = document.querySelector('[data-pos-list]')
                  posList.innerHTML = ''

                  sortPoints.forEach(e => {

                     posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
                  })


               }

            }


            if (event.target.hasAttribute('data-neg-span')) {


               let points = document.querySelectorAll('[data-neg-point]')

               if (points.length > 1) {

                  let sortPoints = Array.from(points).sort((a, b) => {
                     return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
                  })

                  let posList = document.querySelector('[data-neg-list]')
                  posList.innerHTML = ''

                  sortPoints.forEach(e => {

                     posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
                  })


               }

            }


            const base = document.querySelector('[data-body]').innerHTML
            set('base', base)

            const stat = document.querySelector('[data-stat]').innerHTML
            set('stat', stat)

         }

      }


      input.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            blurStatus = false

            mainNum()
            input.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'
         }


      })
      input.addEventListener('blur', () => {

         if (blurStatus) {
            input.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'

         }

      })

   }


   if (event.target.closest("[data-name]")) {

      document.querySelector('[data-pos-add]').style.display = 'none'
      document.querySelector('[data-neg-add]').style.display = 'none'
      document.querySelector('[data-mode]').style.display = 'none'


      let oldValueString = event.target.innerText
      let oldValue = oldValueString

      let input = document.createElement('input')

      input.type = 'text'


      input.style = 'position: fixed; bottom: 10px; left: 10px; width: 80px;'
      input.setAttribute("tabindex", "-1")

      document.body.appendChild(input)

      input.focus()

      let num

      let blurStatus = true



      function name() {



         let newValue = input.value || oldValue

         num = newValue

         input.style = ''

         event.target.innerText = newValue



         const base = document.querySelector('[data-body]').innerHTML
         set('base', base)

         const stat = document.querySelector('[data-stat]').innerHTML
         set('stat', stat)

      }

      input.addEventListener('keydown', (event) => {



         if (event.key === 'Enter') {
            event.preventDefault()



            blurStatus = false

            name()
            input.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'


         }

      })
      input.addEventListener('blur', () => {



         if (blurStatus) {



            input.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'


         }

      })

   }

})


function showDateTime() {
   const now = new Date()

   const year = now.getFullYear()
   const month = String(now.getMonth() + 1).padStart(2, '0') // добавляем 0, если число < 10
   const day = String(now.getDate()).padStart(2, '0')

   const hours = String(now.getHours()).padStart(2, '0')
   const minutes = String(now.getMinutes()).padStart(2, '0')
   const seconds = String(now.getSeconds()).padStart(2, '0')

   const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

   return formattedDate
}

function timePassed(dateString) {
   const past = new Date(dateString)
   const now = new Date()

   let diffMs = now - past // разница в миллисекундах
   let hours = Math.floor(diffMs / (1000 * 60 * 60))
   let minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

   return minutes
}


if (get('taskBody')) {
   document.querySelector('[data-task-body]').innerHTML = get('taskBody')

}


document.addEventListener("click", (event) => {

   const targ = event.target

   if (targ.closest("[data-mark]") && !targ.closest("[data-shell]").classList.contains('_rename') && !targ.closest("[data-shell]").classList.contains('_delete')) {

      const targShell = targ.closest("[data-mark]").closest("[data-shell]")
      const targNum = targShell.querySelector('[data-num]')
      const targMax = targShell.querySelector('[data-max]')
      const targDate = targShell.querySelector('[data-date]')


      const num = targNum.innerText
      const newNum = Number(num) + 1
      const procent = newNum / Number(targMax.innerText) * 100


      if (newNum <= Number(targMax.innerText)) {
         targNum.innerText = newNum

         const now = new Date()
         targDate.innerText = `${now.getHours()}.${now.getMinutes()}`

         targShell.querySelector("[data-task-decor]").style = `width: ${procent}%; transition: width 0.3s ease 0s;`

      }

      if (newNum === Number(targMax.innerText)) {
         targShell.querySelector("[data-task-decor]").style = `width: ${procent}%; transition: width 0.3s ease 0s;`
         targShell.querySelector("[data-info]").style = `color: rgb(75, 192, 192);`

         video('task')
         console.log('task');


      }


      set("taskBody", document.querySelector('[data-task-body]').innerHTML)

   }

   if (targ.closest("[data-end]")) {

      const elems = document.querySelectorAll('[data-shell]')
      const decors = document.querySelectorAll('[data-task-decor]')

      const length = elems.length
      let x = 0
      console.log(`LENGTH: ${length}`);

      decors.forEach((elem) => {
         console.log(`SUCCES: ${elem.style.width} === 100%`);

         if (elem.style.width === '100%') {
            x = x + 1

            console.log('YES');

         }
      })

      if (x === length) {
         video('absolute')

      }

      console.log(`SUCCES: ${x} === ${length}`);

      elems.forEach((elem) => {
         elem.querySelector("[data-num]").innerText = '0'

         elem.querySelector("[data-info]").classList.remove('_active')

         elem.querySelector("[data-date]").innerText = "0.00"

         elem.querySelector("[data-task-decor]").style = `width: 0%; transition: width 0.3s ease 0s;`
         elem.querySelector("[data-info]").style = "color: white;"
      })


      set("startDate", showDateTime())
      set("taskBody", document.querySelector('[data-task-body]').innerHTML)


   }

   if (targ.closest("[data-delete]")) {
      const elems = document.querySelectorAll("[data-shell]")

      elems.forEach((elem) => {
         elem.classList.add('_delete')
      })
   }

   if (targ.closest("[data-rename]")) {
      const elems = document.querySelectorAll("[data-shell]")

      elems.forEach((elem) => {
         elem.classList.add('_rename')
      })
   }

   if (targ.closest("[data-create]")) {
      const elems = document.querySelectorAll("[data-shell]")

      elems.forEach((elem) => {
         elem.classList.add('_create')
      })
   }

   if (targ.closest("[data-shell]")) {

      const shell = targ.closest("[data-shell]")

      if (shell.classList.contains('_delete')) {
         shell.remove()

         const elems = document.querySelectorAll("[data-shell]")

         elems.forEach((elem) => {
            elem.classList.remove('_delete')
         })

         set("taskBody", document.querySelector('[data-task-body]').innerHTML)

      }

   }
   if (targ.closest("[data-shell]")) {

      const shell = targ.closest("[data-shell]")

      if (shell.classList.contains('_rename')) {

         const targShell = targ.closest("[data-shell]")
         const targText = targShell.querySelector("[data-text]")

         const newText = prompt('Имя', targText.innerText)
         if (newText !== '' && newText) {
            targText.innerText = newText

            set("taskBody", document.querySelector('[data-task-body]').innerHTML)

         }


         const elems = document.querySelectorAll("[data-shell]")

         elems.forEach((elem) => {
            elem.classList.remove('_rename')
         })

         set("taskBody", document.querySelector('[data-task-body]').innerHTML)

      }

   }

   if (targ.closest("[data-shell]")) {

      const shell = targ.closest("[data-shell]")

      if (shell.classList.contains('_create')) {

         const newText = prompt('Имя')
         if (newText !== '' && newText) {

            const targShell = targ.closest("[data-shell]")

            targShell.insertAdjacentHTML('afterend', `
                    <div data-shell>
            <div data-mark>
               <div data-task-decor style="width: 0%; transition: width 0.3s ease 0s;"></div>
               <div data-text>${newText}</div>
               <div data-info>
                  <div data-num>0</div>
                  <div>/</div>
                  <div data-max>1</div>
               </div>
            </div>
            <div data-date>0.00</div>
            </div>
               `)

            set("taskBody", document.querySelector('[data-task-body]').innerHTML)

         }

      }

   }

   if (targ.closest("[data-stat]")) {
      const burger = document.querySelector('[data-burger]')
      const shadow = document.querySelector('[data-shadow]')

      if (burger.classList.contains('_active')) {
         burger.classList.remove('_active')
         shadow.classList.remove('_active')

      } else {
         burger.classList.add('_active')
         shadow.classList.add('_active')

      }

   }

   if (targ.closest("[data-shadow]")) {
      const burger = document.querySelector('[data-burger]')
      const shadow = document.querySelector('[data-shadow]')
      burger.classList.remove('_active')
      shadow.classList.remove('_active')

   }


})


const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function () {
   if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.readAsText(file)


      reader.onload = function (event) {

         const text = event.target.result

         fileInput.style.backgroundColor = '#112A21'


         let parts = text.split('@');
         let barData = parts[0];
         barData = JSON.parse(barData)


         set('barData', JSON.stringify(barData))
         set('base', parts[1])
         set('stat', parts[2])
         set('bgRang', parts[3])
         set('taskBody', parts[4])

         console.log(`BGRANG: ${parts[3]}`);
         
         location.reload(true);

      };

   }
});


const videoAll = document.querySelectorAll('[data-video]');

videoAll.forEach((video) => {

   video.addEventListener("ended", function () {

      video.style = "opacity: 0; pointer-events: none;";
   });

})


