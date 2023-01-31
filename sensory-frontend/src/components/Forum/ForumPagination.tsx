import axios from "axios";
import { useEffect, useState } from "react";

const ForumPAgination = ({pages, setCurrentPage, currentPosts, sortedPosts} : {pages: number; setCurrentPage: any; currentPosts: any; sortedPosts: any}) => {
  const numOfPages = [];

    for (let i=1; i <= pages; i++) {
      numOfPages.push(i);
    }

  const [currentButton, setCurrentButton] = useState(1);
  const [listPostInformation, setListPostInformation] = useState([]);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage])

  useEffect(() => {
		axios.get(`http://localhost:3081/api/postinformation`).then((response) => {
			setListPostInformation(response.data);
		});
	}, []);

  return (
    <div className="clearfix">
      <div className="hint-text">Showing <b>{listPostInformation.length}</b> out of <b>{listPostInformation.length}</b> entries</div>
        <ul className="pagination">
          <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item' }`}><a href="#!"
            onClick = { () => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
          >Previous</a></li>
					{
            numOfPages.map((page, index) => {
            	return (
                <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item' }`}><a href="#!" className="page-link"
                  onClick = {()=>setCurrentButton(page)}
                >{page}</a></li> 
              )
            })
					}

					<li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item' }`}><a href="#!"
      			onClick = { () => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)}
    			>Next</a></li>
        </ul>
    	</div>
    )
	}

export default ForumPAgination;