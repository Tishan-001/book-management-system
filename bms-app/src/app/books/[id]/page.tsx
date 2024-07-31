import { BookDetailsPage } from "@/components/book-details";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const BookDetails = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  return (
    <>
      <Header />
      <BookDetailsPage id={id} />;
      <Footer />
    </>
  );
};

export default BookDetails;
