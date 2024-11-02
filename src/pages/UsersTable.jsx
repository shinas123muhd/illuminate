import React, { useState, useEffect } from 'react'
import { getRegisterData } from '../apiServices'
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import FadeLoader from "react-spinners/FadeLoader";

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const updateRowsToShow = (page) => {
    const startIndex = page * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(filteredData.slice(startIndex, endIndex));
  };

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateRowsToShow(newPage);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateRowsToShow(newPage);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    updateRowsToShow(page);
  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = query === ""
      ? data
      : data.filter(row =>
        (row.ParticipantName && row.ParticipantName.toLowerCase().includes(query)) ||
        (row.CollegeName && row.CollegeName.toLowerCase().includes(query))
      );

    setFilteredData(filtered)
    setTotalPage(Math.ceil(filtered.length / rowsLimit));
    setCurrentPage(0);
    setRowsToShow(filtered.slice(0, rowsLimit))
  };

  useEffect(() => {
    updateRowsToShow(currentPage);
  }, [filteredData, currentPage]);


  useEffect(() => {
    const totalPages = Math.ceil(data.length / rowsLimit);
    setTotalPage(totalPages);
    setCustomPagination(Array(totalPages).fill(null));
    setFilteredData(data);
    setRowsToShow(data.slice(0, rowsLimit));
  }, [data, rowsLimit]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getRegisterData();
        const fetchedData = Array.isArray(response.data) ? response.data : [];
        setData(fetchedData)

        setFilteredData(fetchedData)
        setLoading(false)
      } catch (err) {
        console.log("error occured", err)

      }
      setLoading(false)
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total pages and set custom pagination
    const totalPages = Math.ceil(data.length / rowsLimit);
    setTotalPage(totalPages);
    setCustomPagination(Array(Math.ceil(data.length / rowsLimit)).fill(null));
    ;

    // Adjust rowsToShow based on currentPage
    // Ensure currentPage is within bounds (especially when data length changes)

    updateRowsToShow(currentPage); // Adjust currentPage if needed

  }, [data, rowsLimit, currentPage]);
  return (
    <div className='font-montserrat'>
      <div className="min-h-screen h-full bg-white flex  justify-center pt-10 pb-14 ">
        <div className="w-full  px-2 ">
          <div className='flex justify-between items-center  w-full'>
            <div className=''>
              <h1 className="text-2xl font-medium">
                Registered Users
              </h1>
            </div>
            <div className=' w-1/2  flex justify-end
            '>
              <form className=" w-1/2 ">
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-3 ps-12 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-full bg-gray-50 dark:border-gray-500  "
                    value={searchQuery}
                    placeholder="Search by name or college"
                    onChange={handleSearch}
                    required />

                </div>
              </form>
            </div>
          </div>

          {
            loading ? (<div className="flex justify-center items-center mt-10">
              <FadeLoader color="#000" loading={loading} size={50} />
            </div>) : (
              <div className="w-full overflow-x-scroll md:overflow-auto  2xl:max-w-none mt-2 ">
                <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
                  <thead className="rounded-lg text-base text-white font-semibold w-full">
                    <tr className="bg-[#222E3A]/[6%] text-black">
                      <th className="py-3 px-3 sm:text-base  whitespace-nowrap">
                        Reg ID
                      </th>
                      <th className="py-3 px-3 sm:text-base  whitespace-nowrap">
                        Name
                      </th>
                      <th className="py-3 px-3  sm:text-base  whitespace-nowrap">
                        Designation
                      </th>
                      <th className="py-3 px-3  sm:text-base  whitespace-nowrap">
                        College
                      </th>
                      <th className="py-3 px-3  sm:text-base  whitespace-nowrap">
                        Contact No
                      </th>
                      <th className="py-3 px-3  sm:text-base  whitespace-nowrap">
                        Email
                      </th>
                      <th className="py-3 px-3  sm:text-base  whitespace-nowrap">
                        Reg Date
                      </th>
                      <th className="py-3 px-3  sm:text-base  whitespace-nowrap">
                        Food Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsToShow.map((row, index) => (
                      <tr
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#222E3A]/[6%]'
                          }`}
                        key={index}
                      >
                        <td className="py-5 px-3 font-normal text-base border-t whitespace-nowrap">
                          {row.RegistrationID}
                        </td>
                        <td className="py-5 px-3 font-normal text-base border-t whitespace-nowrap">
                          {row.ParticipantName}
                        </td>
                        <td className="py-5 px-3 font-normal  text-base border-t whitespace-nowrap">
                          {row.Designation}
                        </td>
                        <td className="py-5 px-3 text-base font-normal border-t w-72 whitespace-normal">
                          {row.CollegeName}
                        </td>
                        <td className="py-5 px-3 text-base font-normal border-t whitespace-nowrap">
                          {row.ContactNo}
                        </td>
                        <td className="py-5 px-3 text-base font-normal border-t whitespace-nowrap">
                          {row.EmailID}
                        </td>
                        <td className="py-5 px-3 text-base font-normal border-t whitespace-nowrap">
                          {row.RegistrationDate}
                        </td>
                        <td className="py-5 px-3  text-base font-normal border-t whitespace-nowrap">
                          {row.FoodType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>)}
          <div className="w-full flex justify-center sm:justify-end flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">

            <div className="flex">
              <ul className="flex justify-center items-center gap-x-2 z-30">
                <li
                  className={`prev-btn flex items-center justify-center w-9 h-9 border ${currentPage === 0
                      ? 'bg-gray-300 pointer-events-none'
                      : 'cursor-pointer'
                    }`}
                  onClick={previousPage}
                >
                  <GrFormPrevious className='cursor-pointer' />
                </li>
                {customPagination.map((_, index) => (
                  <li
                    className={`flex items-center justify-center w-9 h-9 cursor-pointer border ${currentPage === index ? 'text-blue-600 border-blue-500' : ''
                      }`}
                    onClick={() => changePage(index)}
                    key={index}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  className={`flex items-center justify-center w-9 h-9 border ${currentPage === totalPage - 1
                      ? 'bg-gray-300 pointer-events-none'
                      : 'cursor-pointer'
                    }`}
                  onClick={nextPage}
                >
                  <MdNavigateNext />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersTable