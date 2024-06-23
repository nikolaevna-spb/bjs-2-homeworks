class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    fix() {
        this.state *= 1.5;
    }

    set state(value) {
        if (value < 0) {
            this._state = 0;
        } else if (value > 100) {
            this._state = 100;
        } else {
            this._state = value;
        }
    }

    get state() {
        return this._state;
    }
}

//Пример использования
const sherlock = new PrintEditionItem(
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
   );
   
   console.log(sherlock.releaseDate); //2019
   console.log(sherlock.state); //100
   sherlock.fix();
   console.log(sherlock.state); //100

/*====================================================================================*/

    class Magazine extends PrintEditionItem {
        type = "magazine";
    }

    class Book extends PrintEditionItem {
        constructor(author, name, releaseDate, pagesCount) {
            super(name, releaseDate, pagesCount);
            this.author = author;
            this.type = "book";
        }
    }

    class NovelBook extends Book {
        type = "novel";
    }

    class FantasticBook extends Book {
        type = "fantastic";
    }

    class DetectiveBook extends Book {
        type = "detective";
    }

//Пример использования
    const picknick = new FantasticBook(
        "Аркадий и Борис Стругацкие",
        "Пикник на обочине",
        1972,
        168
      );
      
      console.log(picknick.author); //"Аркадий и Борис Стругацкие"
      picknick.state = 10;
      console.log(picknick.state); //10
      picknick.fix();
      console.log(picknick.state); //15

/*====================================================================================*/

    class Library {
        constructor(name) {
            this.name = name;
            this.books = [];
        }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        return this.books.find(book => book[type] === value) || null;
    }

    giveBookByName(bookName) {
        const findBook = this.findBookBy("name", bookName);
        if (!findBook) {
            return null;
        }
        this.books = this.books.filter(book => book !== findBook);
        return findBook;
    }
}

//Пример использования
const library = new Library("Библиотека имени Ленина");

library.addBook(
 new DetectiveBook(
   "Артур Конан Дойл",
   "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
   2019,
   1008
 )
);
library.addBook(
 new FantasticBook(
   "Аркадий и Борис Стругацкие",
   "Пикник на обочине",
   1972,
   168
 )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3

/*====================================================================================*/

class Student {
    marks = {};
    constructor(name) {
        this.name = name;
    }

    addMark(mark, subjectName) {
        if (mark < 2 || mark > 5) {
            return;
        }

        if (!this.marks[subjectName]) {
            this.marks[subjectName] = [];
        }
        
        this.marks[subjectName].push(mark);
    }

    getAverageBySubject(subjectName) {
        if (!this.marks[subjectName]) {
            return 0;
        }
        
        return this.marks[subjectName].reduce((acc, mark) => acc + mark / this.marks[subjectName].length, 0);
    }

    getAverage() {
        const allSubjectsName = Object.keys(this.marks);
        return allSubjectsName.reduce((acc, subjectName) => acc + this.getAverageBySubject(subjectName) / allSubjectsName.length, 0);
    }
}
    
//Пример использования
  const student = new Student("Олег Никифоров");
  student.addMark(5, "химия");
  student.addMark(5, "химия");
  student.addMark(5, "физика");
  student.addMark(4, "физика");
  student.addMark(6, "физика"); // Оценка не добавится, так как больше 5
  student.getAverageBySubject("физика"); // Средний балл по предмету физика 4.5
  student.getAverageBySubject("биология"); // Вернёт 0, так как по такому предмету нет никаких оценок.
  student.getAverage(); // Средний балл по всем предметам 4.75