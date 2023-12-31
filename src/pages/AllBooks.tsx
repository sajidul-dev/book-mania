import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/feature/book/bookApi";
import { BookInterface } from "../types/bookType";

const AllBooks = () => {
  // const [books, setBooks] = useState([]);
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  // useEffect(() => {
  //   axios.get("http://localhost:5000/books").then((res) => {
  //     setBooks(res.data.data);
  //   });
  // }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {data?.data?.length > 0 &&
          data.data.map((book: BookInterface) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
