//Создание таблицы
export const createTable = (tableName, data, meta) => {
  let query = ``
  let columnNames = ``;
  // console.log(tableName);
  
  if (tableName.includes("lib")) {
    for (const key of meta) {
      if (key.field !== "id") {
        columnNames = `${columnNames}${key.field} ${key.dbFieldType}, `;
      }
    }
  } else if (tableName.includes("meta")) {
    for (const key of Object.keys(meta[0])) {
      // console.log(Object.keys(key));
      columnNames = `${columnNames}${key} varchar(45), `;
    }
  } else if (tableName.includes("values")) {
    for (const key of meta) {
      if (key.field !== "id") {
        columnNames = `${columnNames}${key.field} varchar(145), `;
      }
    }
  }
  
  columnNames = columnNames.slice(0, -2);
  query = `CREATE TABLE if not exists ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, ${columnNames});`;
  console.log(query);
  return query;
};

//Добавление данных в таблицу
export const insertData = (tableName, data) => {
  let query = ``;
  let columnNames = ``;
  let questionMarks = ``;
  for (let j = 0; j < Object.values(data).length; j++) {
    columnNames = `${columnNames}${Object.keys(data)[j]}, `;
    questionMarks = `${questionMarks}?, `;
  }
  //Обрезание последних запятой и пробела в тексте запроса (поля)
  columnNames = columnNames.slice(0, -2);
  //Обрезание последних запятой и пробела в тексте запроса (знаки вопросов)
  questionMarks = questionMarks.slice(0, -2);
  //Формирование текста sql-запроса
  query = `INSERT INTO ${tableName} (${columnNames}) VALUES(${questionMarks});`;
  return query
}

//Изменение данных в таблице
export const updateData = (tableName, rowData, rowId) => {
  let query = ``;
  let columnNames = ``;
  for (let j = 0; j < Object.values(rowData).length; j++) {
    if (Object.keys(rowData)[j] !== "id" && Object.values(rowData)[j] !== null) {
        if (Object.keys(rowData)[j] == "is_workplace" || Object.keys(rowData)[j] == "was_deleted") {
            columnNames = `${columnNames}${Object.keys(rowData)[j]} = ${Object.values(rowData)[j]}, `
        } else {
            columnNames = `${columnNames}${Object.keys(rowData)[j]} = '${Object.values(rowData)[j]}', `
        }
    }
  }
  //Обрезание последних запятой и пробела в тексте запроса (поля)
  columnNames = columnNames.slice(0, -2);
  //Формирование текста sql-запроса
  query = `UPDATE ${tableName} SET ${columnNames} WHERE id = ${rowId};`;
  return query;
};