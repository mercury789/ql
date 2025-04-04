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

var ctx2 = document.getElementById('chart2').getContext('2d');
ctx2.canvas.width = 1000;
ctx2.canvas.height = 700;

var ctx3 = document.getElementById('chart3').getContext('2d');
ctx3.canvas.width = 1000;
ctx3.canvas.height = 700;


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


if (get('barData2') && JSON.parse(get('barData2')).length !== 0) {

   document.querySelector('[data-money-start]').remove()

   var barData2 = JSON.parse(get('barData2'))

   let endObj = barData2[barData2.length - 1];

   let oldNum = endObj.c;

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
            barData2.push({ x: Date.now(), o: oldNum, h: oldNum, l: oldNum, c: oldNum, date: date })
         } else {

            const newX = Number(barData2[barData2.length - 1].x) + 86400000
            const newDate = Number(barData2[barData2.length - 1].date) + 100000

            barData2.push({ x: newX, o: oldNum, h: oldNum, l: oldNum, c: oldNum, date: newDate })
         }

      }


      if (barData2.length === 3) {
         if (barData2[0].date === '') {
            barData2.shift()
         }
      }

      set('barData2', JSON.stringify(barData2))

   }

   document.querySelector('[data-money]').innerHTML = get('money')


} else {

   var barData2 = [];
   document.querySelector('[data-money-neg-add]').classList.add('_block')
   document.querySelector('[data-money-pos-add]').style = 'bottom: 60px; right: 10px;'

}
if (get('barData3') && JSON.parse(get('barData3')).length !== 0) {

   var barData3 = JSON.parse(get('barData3'))

   let endObj = barData3[barData3.length - 1];

   let oldNum = endObj.c;

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
            barData3.push({ x: Date.now(), o: oldNum, h: oldNum, l: oldNum, c: oldNum, date: date })
         } else {

            const newX = Number(barData3[barData3.length - 1].x) + 86400000
            const newDate = Number(barData3[barData3.length - 1].date) + 100000

            barData3.push({ x: newX, o: oldNum, h: oldNum, l: oldNum, c: oldNum, date: newDate })
         }

      }


      if (barData3.length === 3) {
         if (barData3[0].date === '') {
            barData3.shift()
         }
      }

      set('barData3', JSON.stringify(barData3))

   }

   document.querySelector('[data-note-body]').innerHTML = get('noteBody')


} else {

   var barData3 = [];

   let today = new Date();
   let day = today.getDate(); // день
   let month = today.getMonth() + 1; // месяц (нумерация с 0)
   let year = today.getFullYear(); // год
   const date = `${day}${month}${year}`;

   let zero = 0

   barData3.push({ x: Date.now() - 86400000, o: zero, h: zero, l: zero, c: zero, date: '' })

   barData3.push({ x: Date.now(), o: zero, h: zero, l: zero, c: zero, date: date })

   set('barData3', JSON.stringify(barData3))
   const note = document.querySelector('[data-note-body]').innerHTML
   set('note', note)

}


var lineData = barData.map(data => ({ x: data.x, y: data.c }));
var lineData2 = barData.map(data => ({ x: data.x, y: data.c }));
var lineData3 = barData.map(data => ({ x: data.x, y: data.c }));

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
var chart2 = new Chart(ctx2, {
   type: 'candlestick',
   data: {
      datasets: [
         {
            label: '',
            data: barData2,

            borderColor: '#100F14',
            backgroundColors: {
               up: 'rgba(255, 230, 2, 0.5)',
               down: 'rgba(255, 99, 132, 0.5)',
               unchanged: 'rgba(201, 203, 207, 0.5)',
            },
            borderColors: {
               up: 'rgb(255, 230, 2)',
               down: 'rgb(255, 99, 132)',
               unchanged: 'rgb(201, 203, 207)',
            }
         },
         {
            label: '',
            type: 'line',
            data: lineData2,
            hidden: true,
         }

      ]
   }
});
var chart3 = new Chart(ctx3, {
   type: 'candlestick',
   data: {
      datasets: [
         {
            label: '',
            data: barData3,

            borderColor: '#100F14',
            backgroundColors: {
               up: 'rgba(100, 75, 192, 0.5)',
               down: 'rgba(255, 99, 132, 0.5)',
               unchanged: 'rgba(201, 203, 207, 0.5)',
            },
            borderColors: {
               up: 'rgb(100, 75, 192)',
               down: 'rgb(255, 99, 132)',
               unchanged: 'rgb(201, 203, 207)',
            }
         },
         {
            label: '',
            type: 'line',
            data: lineData3,
            hidden: true,
         }

      ]
   }
});

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

   document.querySelector('[data-money-stat]').innerHTML = `
  
   <div class="stat-top">
      <div class="icon"><img data-rang src="icon/0.png"></div>
      <span> </span>
      <span class='name'>MN/PRC</span>
      <span> </span>
      <span data-statmoney-procent>0.00</span>
   </div>
 
   <div><span data-statmoney-num>0.00</span><span> </span></div>
  
   <div>⠀</div>
  
  `

}
if (get('moneyStat')) {
   document.querySelector('[data-money-stat]').innerHTML = get('moneyStat')


} else {

   document.querySelector('[data-money-stat]').innerHTML = `
  
   <div class="stat-top">
      <div class="icon"><img data-money-rang src="icon/0.png"></div>
      <span> </span>
      <span class='name'>MN/PRC</span>
      <span> </span>
      <span data-statmoney-procent>0.00</span>
   </div>
 
   <div><span data-statmoney-num>0.00</span><span> </span></div>
  
   <div>⠀</div>
  
  `

}
if (get('noteStat')) {
   document.querySelector('[data-note-stat]').innerHTML = get('noteStat')


} else {

   document.querySelector('[data-note-stat]').innerHTML = `
  
   <div class="stat-top">
      <div class="icon"><img data-note-rang src="icon/0.png"></div>
      <span> </span>
      <span class='name'>NT/PRC</span>
      <span> </span>
      <span data-statnote-procent>0.00</span>
   </div>
 
   <div><span data-statnote-num>0.00</span><span> </span></div>
  
   <div>⠀</div>
  
  `

}

document.addEventListener("click", (event) => {

   if (event.target.closest("[data-footer-name]")) {
      const att = event.target.closest("[data-footer-name]").getAttribute('data-footer-name')

      const mn = document.querySelector('[data-mn]')
      const ql = document.querySelector('[data-ql]')
      const note = document.querySelector('[data-note]')

      const footerAll = document.querySelectorAll('[data-footer-name]')
      footerAll.forEach((footer) => {

         if (footer.getAttribute('data-footer-name') !== att) {
            footer.classList.remove('_active')
            document.querySelector(`[data-${att}]`).style.display = 'none'
         } else {
            footer.classList.add('_active')
            document.querySelector(`[data-${att}]`).style.display = 'block'

         }
      })


      if (att === 'mn') {
         event.target.classList.add('_active')

         mn.style.display = 'block'
         ql.style.display = 'none'
         note.style.display = 'none'
      }

      if (att === 'ql') {
         event.target.classList.add('_active')

         mn.style.display = 'none'
         ql.style.display = 'block'
         note.style.display = 'none'
      }

      if (att === 'note') {
         event.target.classList.add('_active')

         mn.style.display = 'none'
         ql.style.display = 'none'
         note.style.display = 'block'
      }


   }



   if (event.target.closest("[data-money-categorie]")) {

      const text = event.target.closest("[data-money-categorie]").innerText
      let input = document.querySelector('input[tabindex="-1"]')

      if (input) {

         const inputValue = Number(input.value)
         const inputAtt = document.querySelector('[data-temp-input]').getAttribute('data-temp-input')

         if (inputValue) {

            let today = new Date();
            let day = today.getDate(); // день
            let month = today.getMonth() + 1; // месяц (нумерация с 0)
            let year = today.getFullYear(); // год
            const date = `${day}${month}${year}`;

            if (inputAtt === 'pos') {
               document.querySelector('[data-money]').insertAdjacentHTML('afterbegin', `
               <div data-money-shell>
               <div data-money-text>${text}</div>
               <div class="money-flex">
                  <div data-money-profit>${inputValue.toFixed(2)}</div>
                  <div data-money-date>${day}.${month}</div>
               </div>
               </div>
               `)
            } else {
               document.querySelector('[data-money]').insertAdjacentHTML('afterbegin', `
             
               `)
            }

            document.querySelector('[data-money-pos-add]').style.display = 'flex'
            document.querySelector('[data-money-neg-add]').style.display = 'flex'
            document.querySelector('[data-task-shadow]').classList.remove('_active')
            input.remove()
            event.target.closest("[data-money-categories]").style.display = 'none'

            let num = Number(inputValue)

            let checkDate = barData2.find(obj => obj.date === date)

            if (checkDate) {

               if (num) {

                  if (!document.querySelector('[data-money-start]')) {

                     if (inputAtt === 'pos') {
                        const profitClose = checkDate.c + num
                        const cleanProfitUP = profitClose - checkDate.o
                        const cleanProfitDOWN = checkDate.o - profitClose
                        checkDate.c = profitClose

                        const statNum = document.querySelector('[data-statmoney-num]')
                        const statProcent = document.querySelector('[data-statmoney-procent]')

                        const asset = document.querySelectorAll('[data-asset]')
                        asset.forEach((asset) => {
                           if (asset.querySelector('[data-asset-text]').innerText === text) {
                              const newAssetNum = inputValue + Number(asset.querySelector('[data-asset-num]').innerText)
                              asset.querySelector('[data-asset-num]').innerText = newAssetNum.toFixed(2)
                           }
                        })

                        statNum.innerText = profitClose.toFixed(2)
                        if (profitClose >= checkDate.o) {
                           statProcent.innerText = `+${cleanProfitUP.toFixed(2)}`
                           statNum.style = 'color: rgb(255, 230, 2);'
                           statProcent.style = 'color: rgb(255, 230, 2); background-color: rgba(255, 230, 2, 0.5);'
                        } else {
                           statProcent.innerText = `-${cleanProfitDOWN.toFixed(2)}`
                           statNum.style = 'color:  rgb(255, 99, 132);'
                           statProcent.style = 'color:  rgb(255, 99, 132); background-color: rgba(255, 99, 132, 0.5);'
                        }
                        set('moneyStat', document.querySelector('[data-money-stat]').innerHTML)

                        if (profitClose >= checkDate.h) {
                           checkDate.h = profitClose
                        }
                     } else {

                        const loseClose = checkDate.c - num
                        const cleanLoseDOWN = checkDate.o - loseClose
                        const cleanLoseUP = loseClose - checkDate.o
                        checkDate.c = loseClose

                        const statNum = document.querySelector('[data-statmoney-num]')
                        const statProcent = document.querySelector('[data-statmoney-procent]')

                        const asset = document.querySelectorAll('[data-asset]')
                        asset.forEach((asset) => {
                           if (asset.querySelector('[data-asset-text]').innerText === text) {
                              const newAssetNum = Number(asset.querySelector('[data-asset-num]').innerText) - inputValue
                              asset.querySelector('[data-asset-num]').innerText = newAssetNum.toFixed(2)
                           }
                        })

                        statNum.innerText = loseClose.toFixed(2)
                        if (loseClose <= checkDate.o) {
                           statProcent.innerText = `-${cleanLoseDOWN.toFixed(2)}`
                           statNum.style = 'color:  rgb(255, 99, 132);'
                           statProcent.style = 'color: rgb(255, 99, 132); background-color: rgba(255, 99, 132, 0.5);'

                        } else {
                           statProcent.innerText = `+${cleanLoseUP.toFixed(2)}`
                           statNum.style = 'color:  rgb(255, 230, 2);'
                           statProcent.style = 'color: rgb(255, 230, 2); background-color: rgba(255, 230, 2, 0.5);'
                        }
                        set('moneyStat', document.querySelector('[data-money-stat]').innerHTML)

                        if (loseClose <= checkDate.l) {
                           checkDate.l = loseClose
                        }

                     }

                  }

               }

               chart2.update()

               set('barData2', JSON.stringify(barData2))
               const money = document.querySelector('[data-money]').innerHTML
               set('money', money)

            } else {

               if (num) {

                  if (document.querySelector('[data-money-start]')) {

                     document.querySelector('[data-money-start]').remove()

                     let profitSum = Number(document.querySelector('[data-money-profit]').innerText)

                     barData2.push({ x: Date.now() - 86400000, o: profitSum, h: profitSum, l: profitSum, c: profitSum, date: '' })

                     barData2.push({ x: Date.now(), o: profitSum, h: profitSum, l: profitSum, c: profitSum, date: date })

                     document.querySelector('[data-money-neg-add]').classList.remove('_block')
                     document.querySelector('[data-money-pos-add]').style = 'bottom: 60px; right: 10px;'

                     const asset = document.querySelectorAll('[data-asset]')
                     asset.forEach((asset) => {
                        if (asset.querySelector('[data-asset-text]').innerText === text) {
                           const newAssetNum = Number(asset.querySelector('[data-asset-num]').innerText) + inputValue
                           asset.querySelector('[data-asset-num]').innerText = newAssetNum.toFixed(2)
                        }
                     })

                     set('barData2', JSON.stringify(barData2))
                     chart2.update()
                     const money = document.querySelector('[data-money]').innerHTML
                     set('money', money)

                  }

               }
            }

         }
      } else {
         document.querySelector('[data-money-pos-add]').style.display = 'none'
         document.querySelector('[data-money-neg-add]').style.display = 'none'
         const oldAsset = event.target.closest('[data-asset]')
         const oldAssetNum = oldAsset.querySelector('[data-asset-num]')
         document.querySelector('[data-dropdown]').remove()

         input = document.createElement('input')

         input.type = 'number'
         input.style = 'position: fixed; bottom: 60px; left: 10px; width: 100px; color: #FCFCFC;'
         input.setAttribute("tabindex", "-1")

         document.body.appendChild(input)

         input.focus()

         input.addEventListener('keydown', (event) => {

            if (event.key === 'Enter') {
               event.preventDefault()

               const inputValue = Number(input.value)

               if (inputValue && inputValue <= Number(oldAssetNum.innerText)) {

                  const oldNewNum = Number(oldAssetNum.innerText) - inputValue
                  oldAssetNum.innerText = oldNewNum.toFixed(2)

                  const assetTextAll = document.querySelectorAll('[data-asset-text]')
                  assetTextAll.forEach((assetText) => {

                     if (assetText.innerText === text) {
                        const assetNum = assetText.closest('[data-asset]').querySelector('[data-asset-num]')

                        const newNum = Number(assetNum.innerText) + inputValue
                        assetNum.innerText = newNum.toFixed(2)

                     }
                  })
               }

               input.remove()

               document.querySelector('[data-money-pos-add]').style.display = 'flex'
               document.querySelector('[data-money-neg-add]').style.display = 'flex'
               document.querySelector("[data-task-shadow]").classList.remove('_active')
               document.querySelector("[data-asset-text]").classList.remove('_active')
               document.querySelector("[data-dropdown]") && document.querySelector("[data-dropdown]").remove()

            }

         })
      }

   }


   if (event.target.closest("[data-asset-create]")) {
      document.querySelector('[data-money-pos-add]').style.display = 'none'
      document.querySelector('[data-money-neg-add]').style.display = 'none'
      document.querySelector('[data-dropdown]').remove()

      let input = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 100px; color: #FCFCFC;'
      input.setAttribute("tabindex", "-1")

      document.body.appendChild(input)

      input.focus()

      function mainText() {

         if (input.value && input.value !== '') {

            document.querySelector('[data-money-categories]').insertAdjacentHTML('afterbegin', `
            <div data-money-categorie>${input.value}</div>
            `)

            document.querySelector('[data-asset-text]._active').closest('[data-asset]').insertAdjacentHTML('afterend', `
               <div data-asset>
                  <div data-asset-text>${input.value}</div>
                  <div data-asset-num>0.00</div>
               </div>
            `)


         }

      }

      input.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            mainText()
            input.remove()

            document.querySelector('[data-money-pos-add]').style.display = 'flex'
            document.querySelector('[data-money-neg-add]').style.display = 'flex'
            document.querySelector("[data-task-shadow]").classList.remove('_active')
            document.querySelector("[data-asset-text]").classList.remove('_active')
            document.querySelector("[data-dropdown]") && document.querySelector("[data-dropdown]").remove()

         }

      })

   }

   if (event.target.closest("[data-note-add]")) {
      document.querySelector('[data-note-add]').style.display = 'none'
      document.querySelector("[data-task-shadow]").classList.add('_active')


      let input = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 100px; color: rgb(255, 230, 2);'
      input.setAttribute("tabindex", "-1")

      document.body.appendChild(input)

      input.focus()

      function mainText() {

         document.querySelector('[data-note]').insertAdjacentHTML('beforeend', `
                  <div data-note-point>
                   <div data-note-text>${input.value}</div>
                  </div>
            `)

      }

      input.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            if (input.value && input.value !== '') {

               mainText()

               input.remove()

               document.querySelector('[data-note-add]').style.display = 'flex'
               document.querySelector("[data-task-shadow]").classList.remove('_active')
            }


         }

      })
   }

   if (event.target.closest("[data-money-pos-add]")) {

      document.querySelector('[data-money-pos-add]').style.display = 'none'
      document.querySelector('[data-money-neg-add]').style.display = 'none'
      document.querySelector('[data-money-categories]').style.display = 'flex'
      document.querySelector('[data-task-shadow]').classList.add('_active')

      let input = document.createElement('input')

      input.type = 'number'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 40px; color: rgb(255, 230, 2);'
      input.setAttribute("tabindex", "-1")
      input.setAttribute("data-temp-input", "pos")

      document.body.appendChild(input)

      input.focus()

   }
   if (event.target.closest("[data-money-neg-add]")) {

      document.querySelector('[data-money-pos-add]').style.display = 'none'
      document.querySelector('[data-money-neg-add]').style.display = 'none'
      document.querySelector('[data-money-categories]').style.display = 'flex'
      document.querySelector('[data-task-shadow]').classList.add('_active')

      let input = document.createElement('input')

      input.type = 'number'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 40px; color: rgb(255, 99, 132);'
      input.setAttribute("tabindex", "-1")
      input.setAttribute("data-temp-input", "neg")

      document.body.appendChild(input)

      input.focus()

   }

   if (event.target.closest("[data-pos-add]")) {

      document.querySelector('[data-pos-add]').style.display = 'none'
      document.querySelector('[data-neg-add]').style.display = 'none'
      document.querySelector('[data-mode]').style.display = 'none'
      document.querySelector('[data-task-shadow]').classList.add('_active')

      let input = document.createElement('input')
      let inputSecond = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 100px; color: #FCFCFC;'
      input.setAttribute("tabindex", "-1")


      inputSecond.type = 'number'
      inputSecond.style = 'position: fixed; bottom: 60px; left: 135px; width: 40px; color: rgb(75, 192, 192);'
      inputSecond.setAttribute("tabindex", "-1")
      inputSecond.setAttribute("data-input-second", "")


      document.body.appendChild(input)
      document.body.appendChild(inputSecond)


      input.focus()


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
               document.querySelector('[data-money-rang]').setAttribute('src', `icon/${rang(Number(procent))}.png`)
               const moneyStat = document.querySelector('[data-money-stat]').innerHTML
               set('moneyStat', moneyStat)
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

      input.addEventListener('keydown', (event) => {


         if (event.key === 'Enter') {
            event.preventDefault()

            inputSecond.focus()

         }

      })


      inputSecond.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            mainText()
            mainNum()
            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'
            document.querySelector('[data-task-shadow]').classList.remove('_active')

         }

      })

   }

   if (event.target.closest("[data-neg-add]")) {

      document.querySelector('[data-pos-add]').style.display = 'none'
      document.querySelector('[data-neg-add]').style.display = 'none'
      document.querySelector('[data-mode]').style.display = 'none'
      document.querySelector('[data-task-shadow]').classList.add('_active')


      let input = document.createElement('input')
      let inputSecond = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 100px; color: #FCFCFC;'
      input.setAttribute("tabindex", "-1")


      inputSecond.type = 'number'
      inputSecond.style = 'position: fixed; bottom: 60px; left: 135px; width: 40px; color: rgb(255, 99, 132);'
      inputSecond.setAttribute("tabindex", "-1")
      inputSecond.setAttribute("data-input-second", "")


      document.body.appendChild(input)
      document.body.appendChild(inputSecond)

      input.focus()

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
               document.querySelector('[data-money-rang]').setAttribute('src', `icon/${rang(Number(procent))}.png`)
               const moneyStat = document.querySelector('[data-money-stat]').innerHTML
               set('moneyStat', moneyStat)
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

      input.addEventListener('keydown', (event) => {


         if (event.key === 'Enter') {
            event.preventDefault()

            inputSecond.focus()

         }

      })


      inputSecond.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            mainText()
            mainNum()
            input.remove()
            inputSecond.remove()

            document.querySelector('[data-pos-add]').style.display = 'flex'
            document.querySelector('[data-neg-add]').style.display = 'flex'
            document.querySelector('[data-mode]').style.display = 'flex'
            document.querySelector('[data-task-shadow]').classList.remove('_active')


         }

      })

   }

   if (event.target.closest("[data-clear]")) {

      clear()
      event.target.style.backgroundColor = '#33181B'

   }

   if (event.target.closest("[data-money-clear]")) {

      rem('money')
      rem('moneyStat')
      rem('barData2')
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
      document.querySelector('[data-money-rang]').setAttribute('src', `icon/${rang(Number(procent))}.png`)
      const moneyStat = document.querySelector('[data-money-stat]').innerHTML
      moneyStat('moneyStat', moneyStat)
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

      const barData2 = get('barData2');
      const money = get('money');
      const moneyStat = get('moneyStat');

      let today = new Date();
      let day = today.getDate(); // день
      let month = today.getMonth() + 1; // месяц (нумерация с 0)
      let year = today.getFullYear(); // год

      const date = `${day}.${month}.${year}`;

      event.target.style.backgroundColor = '#112A21';

      const copy = barData;
      const copy2 = barData2;
      const content = `${JSON.stringify(copy)}@${base}@${stat}@${bgRang}@${taskBody}@${JSON.stringify(copy2)}@${money}@${moneyStat}`;
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


      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 40px;'
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

            mainNum()
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


      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 80px;'
      input.setAttribute("tabindex", "-1")

      document.body.appendChild(input)

      input.focus()

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

            name()
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

   if (targ.closest("[data-mark]")) {

      const targShell = targ.closest("[data-mark]").closest("[data-shell]")
      const targNum = targShell.querySelector('[data-num]')
      const targMax = targShell.querySelector('[data-max]')
      const targDate = targShell.querySelector('[data-date]')
      const rewardNum = Number(targShell.getAttribute('data-reward'))

      let num = Number(targNum.innerText)
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
         targShell.querySelector("[data-info]").style = `color: rgba(100, 75, 192, 1)`

         video('task')
         console.log('task');

      }

      let today = new Date();
      let day = today.getDate(); // день
      let month = today.getMonth() + 1; // месяц (нумерация с 0)
      let year = today.getFullYear(); // год

      const date = `${day}${month}${year}`;

      let checkDate = barData3.find(obj => obj.date === date)

      num = rewardNum

      if (checkDate) {

         const profitClose = checkDate.c + num
         const cleanProfitUP = profitClose - checkDate.o
         const cleanProfitDOWN = checkDate.o - profitClose
         checkDate.c = profitClose

         const statNum = document.querySelector('[data-statnote-num]')
         const statProcent = document.querySelector('[data-statnote-procent]')

         statNum.innerText = profitClose.toFixed(2)
         if (profitClose >= checkDate.o) {
            statProcent.innerText = `+${cleanProfitUP.toFixed(2)}`
            statNum.style = 'color: rgb(100, 75, 192);'
            statProcent.style = 'color: rgb(100, 75, 192); background-color: rgba(100, 75, 192, 0.5);'
         } else {
            statProcent.innerText = `-${cleanProfitDOWN.toFixed(2)}`
            statNum.style = 'color:  rgb(255, 99, 132);'
            statProcent.style = 'color:  rgb(255, 99, 132); background-color: rgba(255, 99, 132, 0.5);'
         }
         set('noteStat', document.querySelector('[data-note-stat]').innerHTML)

         if (profitClose >= checkDate.h) {
            checkDate.h = profitClose
         }

         chart3.update()

         set('barData3', JSON.stringify(barData3))
         const noteBody = document.querySelector('[data-note-body]').innerHTML
         set('noteBody', noteBody)

      } else {

         if (num) {

            if (document.querySelector('[data-money-start]')) {

               document.querySelector('[data-money-start]').remove()

               let profitSum = Number(document.querySelector('[data-money-profit]').innerText)

               barData2.push({ x: Date.now() - 86400000, o: profitSum, h: profitSum, l: profitSum, c: profitSum, date: '' })

               barData2.push({ x: Date.now(), o: profitSum, h: profitSum, l: profitSum, c: profitSum, date: date })

               document.querySelector('[data-money-neg-add]').classList.remove('_block')
               document.querySelector('[data-money-pos-add]').style = 'bottom: 60px; right: 10px;'

               const asset = document.querySelectorAll('[data-asset]')
               asset.forEach((asset) => {
                  if (asset.querySelector('[data-asset-text]').innerText === text) {
                     const newAssetNum = Number(asset.querySelector('[data-asset-num]').innerText) + inputValue
                     asset.querySelector('[data-asset-num]').innerText = newAssetNum.toFixed(2)
                  }
               })

               set('barData2', JSON.stringify(barData2))
               chart2.update()
               const money = document.querySelector('[data-money]').innerHTML
               set('money', money)

            }

         }
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

   function isDropdownOutOfView(dropdownElement) {
      // Получаем позицию и размеры дропдауна
      const dropdownRect = dropdownElement.getBoundingClientRect();

      // Проверяем, выходит ли нижняя часть дропдауна за нижнюю границу окна
      const isOutOfViewBottom = dropdownRect.bottom > window.innerHeight;

      return isOutOfViewBottom;
   }

   if (targ.closest("[data-date]")) {
      const targShell = targ.closest("[data-shell]")
      const targDate = targShell.querySelector("[data-date]")
      const targtext = targShell.querySelector("[data-text]")
      const taskShadow = document.querySelector('[data-task-shadow]')

      if (!document.querySelector('[data-dropdown]')) {
         targtext.classList.add('_active')
         taskShadow.classList.add('_active')
         targDate.insertAdjacentHTML('beforeend', `
         <div data-dropdown>
            <button data-create>создать</button>
            <button data-rename>переименовать</button>
            <button data-cancel>отменить</button>
            <button data-delete>удалить</button>
         </div>
            `)

         const dropdown = document.querySelector('[data-dropdown]')
         if (isDropdownOutOfView(dropdown)) {
            dropdown.style.top = 'auto';
            dropdown.style.bottom = '100%';
         }

      }

   }
   if (targ.closest("[data-asset]")) {
      const asset = targ.closest("[data-asset]")
      const targtext = asset.querySelector("[data-asset-text]")
      const taskShadow = document.querySelector('[data-task-shadow]')

      if (!document.querySelector('[data-dropdown]')) {
         targtext.classList.add('_active')
         taskShadow.classList.add('_active')
         asset.insertAdjacentHTML('beforeend', `
         <div data-dropdown>
            <button data-asset-create>создать</button>
            <button data-asset-rename>переименовать</button>
            <button data-asset-convert>конвертировать</button>
            <button data-asset-move-up>поднять</button>
            <button data-asset-move-down>опустить</button>
            <button data-asset-delete>удалить</button>
         </div>
            `)

         const dropdown = document.querySelector('[data-dropdown]')
         if (isDropdownOutOfView(dropdown)) {
            dropdown.style.top = 'auto';
            dropdown.style.bottom = '100%';
         }

      }

   }

   if (targ.closest("[data-money-tab]")) {

      const elemTarg = targ.closest("[data-money-tab]")
      const att = elemTarg.getAttribute('data-money-tab')

      if (!elemTarg.classList.contains('_active')) {
         const old = document.querySelector('[data-money-tab]._active')
         old.classList.remove('_active')
         elemTarg.classList.add('_active')

         if (att === 'transactions') {
            document.querySelector('[data-money]').classList.add('_active')
            document.querySelector('[data-assets]').classList.remove('_active')
         } else {
            document.querySelector('[data-money]').classList.remove('_active')
            document.querySelector('[data-assets]').classList.add('_active')

         }
      }

   }

   if (targ.closest("[data-delete]")) {

      const targShell = targ.closest("[data-shell]")
      const taskShadow = document.querySelector("[data-task-shadow]")

      targShell.remove()
      taskShadow.classList.remove('_active')

      set("taskBody", document.querySelector('[data-task-body]').innerHTML)

   }

   if (targ.closest("[data-asset-delete]")) {

      const targAsset = targ.closest("[data-asset]")
      const taskShadow = document.querySelector("[data-task-shadow]")

      targAsset.remove()
      taskShadow.classList.remove('_active')

   }

   if (targ.closest("[data-asset-move-up]")) {
      const asset = targ.closest("[data-asset]")
      if (asset.previousElementSibling) {
         asset.previousElementSibling.insertAdjacentHTML('beforebegin', asset.outerHTML)
         asset.remove()
      }
      document.querySelector("[data-task-shadow]").classList.remove('_active')
      document.querySelector("[data-dropdown]").remove()
      document.querySelector("[data-asset-text]._active").classList.remove('_active')
   }

   if (targ.closest("[data-asset-move-down]")) {
      const asset = targ.closest("[data-asset]")
      if (asset.nextElementSibling) {
         asset.nextElementSibling.insertAdjacentHTML('afterend', asset.outerHTML)
         asset.remove()
      }
      document.querySelector("[data-task-shadow]").classList.remove('_active')
      document.querySelector("[data-dropdown]").remove()
      document.querySelector("[data-asset-text]._active").classList.remove('_active')
   }

   if (targ.closest("[data-rename]")) {

      const targShell = targ.closest("[data-shell]")
      const targText = targShell.querySelector("[data-text]")
      const targDropdown = targShell.querySelector("[data-dropdown]")
      const taskShadow = document.querySelector("[data-task-shadow]")

      const newText = prompt('Имя', targText.innerText)
      if (newText !== '' && newText) {
         targText.innerText = newText

      }

      targText.classList.remove('_active')
      targDropdown.remove()
      taskShadow.classList.remove('_active')

      set("taskBody", document.querySelector('[data-task-body]').innerHTML)

   }
   if (targ.closest("[data-asset-rename]")) {

      document.querySelector('[data-money-pos-add]').style.display = 'none'
      document.querySelector('[data-money-neg-add]').style.display = 'none'
      document.querySelector('[data-task-shadow]').classList.add('_active')

      const input = document.createElement('input')

      input.type = 'text'
      input.style = 'position: fixed; bottom: 60px; left: 10px; width: 100px; color: #FCFCFC;'
      input.setAttribute("tabindex", "-1")

      document.body.appendChild(input)

      input.focus()

      const targAsset = targ.closest("[data-asset]")
      const targText = targAsset.querySelector("[data-asset-text]")
      const moneyTextAll = document.querySelectorAll("[data-money-text]")
      const targDropdown = document.querySelector("[data-dropdown]")
      const taskShadow = document.querySelector("[data-task-shadow]")

      targDropdown.remove()
      input.value = targText.innerText
      console.log(`TARGTEXT: ${String(targText.innerText)}`);


      input.addEventListener('keydown', (event) => {

         if (event.key === 'Enter') {
            event.preventDefault()

            const newText = input.value
            if (newText !== '' && newText) {

               moneyTextAll.forEach((moneyText) => {

                  if (moneyText.innerText === targText.innerText) {
                     moneyText.innerText = newText
                  }

               })


               const categorieAll = document.querySelectorAll('[data-money-categorie]')
               categorieAll.forEach((categorie) => {

                  if (categorie.innerText === targText.innerText) {
                     categorie.innerText = newText
                  }
               })

               targText.innerText = newText

            }

            input.remove()

            targText.classList.remove('_active')
            taskShadow.classList.remove('_active')
            document.querySelector("[data-asset-text]._active") && document.querySelector("[data-asset-text]._active").classList.remove('_active')
            document.querySelector('[data-money-pos-add]').style.display = 'flex'
            document.querySelector('[data-money-neg-add]').style.display = 'flex'


         }

      })

   }

   if (targ.closest("[data-asset-convert]")) {
      targ.closest("[data-asset-convert]").insertAdjacentHTML('afterbegin', document.querySelector('[data-money-categories]').outerHTML)
      document.querySelector('[data-money-categories]').style = 'top: 0px; right: 100%; display: flex; position: absolute;'

   }

   if (targ.closest("[data-cancel]")) {

      const targShell = targ.closest("[data-shell]")
      const targText = targShell.querySelector("[data-text]")
      const targDropdown = targShell.querySelector("[data-dropdown]")
      const taskShadow = document.querySelector("[data-task-shadow]")

      const targDecor = targShell.querySelector("[data-task-decor]")
      const targNum = targShell.querySelector("[data-num]")
      const targInfo = targShell.querySelector("[data-info]")
      const targDate = targShell.querySelector("[data-date]")

      targDecor.style = 'width: 0%; transition: width 0.3s ease 0s;'
      targInfo.style = 'color: white;'
      targNum.innerText = 0
      targDate.innerText = '0.00'

      targText.classList.remove('_active')
      targDropdown.remove()
      taskShadow.classList.remove('_active')

      set("taskBody", document.querySelector('[data-task-body]').innerHTML)

   }

   if (targ.closest("[data-create]")) {

      const targShell = targ.closest("[data-shell]")
      const targText = targShell.querySelector("[data-text]")
      const targDropdown = targShell.querySelector("[data-dropdown]")
      const taskShadow = document.querySelector("[data-task-shadow]")

      const newText = prompt('Имя')
      if (newText !== '' && newText) {
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

      }

      targText.classList.remove('_active')
      taskShadow.classList.remove('_active')
      targDropdown.remove()
      set("taskBody", document.querySelector('[data-task-body]').innerHTML)

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

   if (targ.closest("[data-task-shadow]")) {
      const shadow = targ.closest("[data-task-shadow]")
      const dropDown = document.querySelector('[data-dropdown]')
      const text = document.querySelector('[data-text]._active')
      const assetText = document.querySelector('[data-asset-text]._active')
      const input = document.querySelector('input[tabindex="-1"]')
      const assetTextActive = document.querySelector('[data-asset-text]._active')
      const inputSecond = document.querySelector('[data-input-second]')

      document.querySelector('[data-note-add]').style.display = 'flex'
      document.querySelector('[data-money-pos-add]').style.display = 'flex'
      document.querySelector('[data-money-neg-add]').style.display = 'flex'
      document.querySelector('[data-pos-add]').style.display = 'flex'
      document.querySelector('[data-neg-add]').style.display = 'flex'
      document.querySelector('[data-money-categories]').style.display = 'none'

      shadow.classList.remove('_active')
      dropDown && dropDown.remove()
      text && text.classList.remove('_active')
      assetText && assetText.classList.remove('_active')
      assetTextActive && assetTextActive.classList.remove('_active')
      input && input.remove('_active')
      inputSecond && inputSecond.remove('_active')

   }

})

const container = document.querySelector('[data-note]');
container.scrollTop = container.scrollHeight;

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
         let barData2 = parts[5];
         barData = JSON.parse(barData)

         set('barData', JSON.stringify(barData))
         set('base', parts[1])
         set('stat', parts[2])
         set('bgRang', parts[3])
         set('taskBody', parts[4])

         if (barData2) {
            barData2 = JSON.parse(barData2)
            set('barData2', barData2)
            set('money', parts[6])
            set('moneyStat', parts[7])
         }

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


