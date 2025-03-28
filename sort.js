const fs = require('fs');
const path = require('path');

async function sort(mode) {
   const folderPath = `./video/${mode}`;

   try {
      const files = await fs.promises.readdir(folderPath);
      const mp4Files = files.filter(file => file.endsWith('.mp4'));
      
      mp4Files.sort(); // просто сортируем лексикографически (по алфавиту)
      
      for (let index = 0; index < mp4Files.length; index++) {
         const file = mp4Files[index];
         const oldPath = path.join(folderPath, file);
         const newPath = path.join(folderPath, `${index + 1}.mp4`);

         if (oldPath !== newPath) {
            try {
               await fs.promises.rename(oldPath, newPath);
               console.log(`${file} -> ${index + 1}.mp4`);
            } catch (err) {
               console.error(`Ошибка переименования ${file}:`, err);
            }
         }
      }
   } catch (err) {
      console.error(`Ошибка обработки папки ${mode}:`, err);
   }
}

async function count(mode) {
   const folderPath = `./video/${mode}`;

   try {
      const updatedFiles = await fs.promises.readdir(folderPath);
      console.log(`${mode}: ${updatedFiles.length},`);
   } catch (err) {
      console.error('ошибка:', err.message);
   }
}

async function processAllModes() {
   const modes = ['task', 'absolute', 'win', 'lose', 'upgrade', 'comeback', 'recordWin', 'recordLose'];

   for (const mode of modes) {
      await sort(mode); // ждем пока сортировка завершится
   }

   for (const mode of modes) {
      await count(mode); // теперь считаем файлы
   }
}

processAllModes();
