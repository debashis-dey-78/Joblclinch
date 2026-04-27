import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://jobclinch-job-portal-backend.onrender.com/api/v1/job/getall",
        {
          params: { keyword, category, city, page, limit: 9 },
          withCredentials: true,
        }
      );
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchJobs();
  };

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        
        {/* Search and Filter Section */}
        <form onSubmit={handleSearch} className="search-filter-form" style={{display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap'}}>
          <input 
            type="text" 
            placeholder="Search by Job Title..." 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            style={{flex: 1, padding: '10px'}}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{padding: '10px'}}>
            <option value="">All Categories</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Frontend Web Development">Frontend Web Development</option>
            <option value="MERN Stack Development">MERN Stack Development</option>
            <option value="Account & Finance">Account & Finance</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Video Animation">Video Animation</option>
            <option value="MEAN Stack Development">MEAN Stack Development</option>
            <option value="MEVN Stack Development">MEVN Stack Development</option>
            <option value="Data Entry Operator">Data Entry Operator</option>
          </select>
          <input 
            type="text" 
            placeholder="City..." 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            style={{padding: '10px'}}
          />
          <button type="submit" style={{padding: '10px 20px', cursor: 'pointer'}}>Search</button>
        </form>

        <div className="banner">
          {jobs && jobs.length > 0 ? (
            jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>Category: {element.category}</p>
                  <p>ADDRESS - </p>
                  <p>Country: {element.country}</p>
                  <p>City: {element.city}</p>
                  <p>Location: {element.location}</p>
                  {"click 'Job Details' for more info..."}
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="pagination" style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px'}}>
            <button 
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
