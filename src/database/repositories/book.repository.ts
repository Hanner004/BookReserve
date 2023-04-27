import { EntityRepository, Repository } from 'typeorm';
import { Book, Author, Editorial } from '../entities';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(newBook: Book, author: Author, editorial: Editorial) {
    const queryRunner = this.manager.connection.createQueryRunner();
    let error: any;
    await queryRunner.startTransaction();
    try {
      newBook.author = author;
      newBook.editorial = editorial;
      const bookSaved = await queryRunner.manager.save(newBook);
      await queryRunner.commitTransaction();
      return bookSaved;
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    console.log(error);
    if (error) throw error;
  }

  async getBooks() {
    return await this.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial')
      .getRawMany();
  }

  async getBook(bookId: number) {
    return await this.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial')
      .where('book.id = :bookId', { bookId })
      .getRawOne();
  }
}
