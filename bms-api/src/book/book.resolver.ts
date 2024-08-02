import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './schema/book.schema';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @Args('ownerId', { type: () => String }) ownerId: string,
  ): Promise<Book> {
    return this.bookService.create(createBookInput, ownerId);
  }

  @Query(() => [Book])
  async findAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  async findOneBook(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookInput);
  }

  @Mutation(() => String)
  async removeBook(
    @Args('id', { type: () => String }) id: string,
  ): Promise<string> {
    await this.bookService.remove(id);
    return 'Book deleted successfully';
  }
}
