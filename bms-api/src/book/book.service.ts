import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(
    createBookInput: CreateBookInput,
    ownerId: string,
  ): Promise<Book> {
    const user = await this.userModel.findById(ownerId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existBook = await this.bookModel
      .findOne({ title: createBookInput.title })
      .exec();
    if (existBook) {
      throw new ConflictException('Book with this title already exists');
    }
    const newBook = await this.bookModel.create({
      ...createBookInput,
      ownerId,
    });
    return newBook;
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, updateBookInput: UpdateBookInput): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookModel.updateOne({ _id: id }, updateBookInput).exec();
    return this.bookModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookModel.deleteOne({ _id: id }).exec();
  }
}
