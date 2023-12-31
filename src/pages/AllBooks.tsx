import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/feature/book/bookApi";
import { BookInterface } from "../types/bookType";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AllBooks = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allBooks, setAllBooks] = useState<BookInterface[]>([]);
  const [selectDate, setSelectDate] = useState<any | undefined>("");

  useEffect(() => {
    if (data?.data) {
      setAllBooks([...data.data]); // Assuming data.data is an array of Book objects
    }
    const genresSet = new Set<string>();

    data?.data.forEach((item: BookInterface) => {
      genresSet.add(item.genre);
    });
    genresSet.add("All Category");
    setAllCategories([...genresSet]);
  }, [data, isLoading]);

  useEffect(() => {
    let filteredData = [];
    const currentSelectDate = new Date(selectDate).getFullYear();

    console.log(currentSelectDate, "currentSelectDate", selectDate);

    if (searchText !== "") {
      const lowerCaseSearchText = searchText.toLowerCase();

      filteredData = data?.data.filter(
        (item: any) =>
          item.title.toLowerCase().includes(lowerCaseSearchText) ||
          item.author.toLowerCase().includes(lowerCaseSearchText) ||
          item.genre.toLowerCase().includes(lowerCaseSearchText)
      );
      setAllBooks(filteredData);
    } else if (searchText === "" && selectedCategory !== "All Category") {
      const lowerCaseSelectedCategory = selectedCategory.toLowerCase();
      if (currentSelectDate !== 1970 && selectDate !== "") {
        filteredData = data?.data.filter(
          (item: any) =>
            item.genre.toLowerCase().includes(lowerCaseSelectedCategory) &&
            parseInt(item.publication) === currentSelectDate
        );
      } else {
        filteredData = data?.data.filter((item: any) =>
          item.genre.toLowerCase().includes(lowerCaseSelectedCategory)
        );
      }
      setAllBooks(filteredData);
    } else if (
      searchText === "" &&
      selectedCategory === "All Category" &&
      currentSelectDate !== 1970 &&
      selectDate !== ""
    ) {
      const filteredData = data?.data.filter(
        (item: any) => parseInt(item.publication) === currentSelectDate
      );

      setAllBooks(filteredData);
    } else {
      filteredData = data?.data;
      setAllBooks(filteredData);
    }
  }, [searchText, selectedCategory, selectDate, data?.data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="w-[90%] mx-auto relative flex flex-col">
      <div className="">
        <form>
          <div className="flex">
            <div
              className="flex flex-col bg-gray-700 rounded-s-lg"
              onMouseLeave={() => setShowDropdown(false)}>
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900    dark:text-white  whitespace-nowrap h-10 w-36"
                type="button">
                {selectedCategory !== "" ? selectedCategory : "All categories"}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="z-10 bg-white divide-y divide-gray-100 rounded-l-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {allCategories.map((category, index) => {
                      return (
                        <li key={index}>
                          <button
                            type="button"
                            className={`inline-flex w-full px-4 py-2 hover:bg-gray-100  ${
                              category === selectedCategory
                                ? "bg-blue-600 hover:bg-gray-800  hover:text-white"
                                : "hover:bg-gray-600"
                            }`}
                            onClick={() => {
                              setSelectedCategory(category);
                              setSearchText("");
                            }}>
                            {category}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="border-l border-r border-white">
              <DatePicker
                selected={selectDate}
                onChange={(date) => {
                  setSelectDate(date);
                  setSearchText("");
                }}
                className="w-[200px] px-3 py-2 !outline-none border-none bg-gray-700 text-white text-center"
                showYearPicker
                isClearable
                dateFormat="yyyy"
              />
            </div>

            <div className="w-full flex h-10">
              <input
                type="search"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search by Name, Genre, Author..."
                required
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSelectedCategory("All Category");
                  setSelectDate("");
                }}
              />
              <button
                type="submit"
                className="p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-20">
        {allBooks?.length > 0 &&
          allBooks.map((book: BookInterface) => (
            <BookCard key={book?._id} book={book} />
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
