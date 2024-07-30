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
import { User, UserDocument } from 'src/user/schema/user.schema';

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
    try {
      const user = await this.userModel.findById(ownerId).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const existBook = await this.bookModel
        .findOne({
          title: createBookInput.title,
        })
        .exec();
      if (existBook) {
        throw new ConflictException('Book with this title already exists');
      }
      const newBook = new this.bookModel({
        ...createBookInput,
        ownerId,
      });
      return newBook.save();
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return this.bookModel.find().exec();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateBookInput: UpdateBookInput): Promise<Book> {
    try {
      const book = await this.bookModel
        .findByIdAndUpdate(id, updateBookInput, { new: true })
        .exec();
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      await this.bookModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error;
    }
  }
}
